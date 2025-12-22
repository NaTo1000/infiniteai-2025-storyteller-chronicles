import axios from 'axios';
import fs from 'fs/promises';
import { createWriteStream, createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class HandbrakeService {
  constructor() {
    this.downloadDir = path.join(__dirname, '../../downloads/handbrake');
    this.githubApiUrl = 'https://api.github.com/repos/HandBrake/HandBrake/releases/latest';
  }

  /**
   * Get latest HandBrake release information from GitHub API
   */
  async getLatestReleaseInfo() {
    try {
      const response = await axios.get(this.githubApiUrl, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Storyteller-Chronicles'
        }
      });

      const release = response.data;
      
      // Find Windows installer
      const windowsAsset = release.assets.find(asset => 
        asset.name.endsWith('.exe') && 
        asset.name.includes('Win_GUI')
      );

      if (!windowsAsset) {
        throw new Error('Windows installer not found in latest release');
      }

      // Find SHA256 file
      // SHA256 files can have various naming patterns:
      // - Same name as installer with .sha256 suffix
      // - Separate checksums file containing all hashes
      const sha256Asset = release.assets.find(asset => 
        (asset.name.toLowerCase().endsWith('.sha256') || 
         asset.name.toLowerCase().includes('sha256') ||
         asset.name.toLowerCase().includes('checksum')) &&
        (asset.name.includes('Win') || asset.name.includes('windows') || 
         asset.name.toLowerCase().includes('sha256sum'))
      );

      return {
        version: release.tag_name,
        name: release.name,
        publishedAt: release.published_at,
        installer: {
          name: windowsAsset.name,
          downloadUrl: windowsAsset.browser_download_url,
          size: windowsAsset.size
        },
        sha256: sha256Asset ? {
          name: sha256Asset.name,
          downloadUrl: sha256Asset.browser_download_url
        } : null
      };
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('HandBrake repository or latest release not found');
      } else if (error.response?.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Please try again later');
      }
      throw new Error(`Failed to fetch HandBrake release information: ${error.message}`);
    }
  }

  /**
   * Download SHA256 checksum from GitHub
   */
  async downloadSHA256(sha256Asset, installerName) {
    try {
      const response = await axios.get(sha256Asset.downloadUrl, {
        responseType: 'text'
      });

      // SHA256 files typically contain the hash followed by the filename
      // Format: <hash> <filename>
      // Files may contain multiple entries (one per line)
      const content = response.data.trim();
      const lines = content.split('\n');
      
      // Try to find the hash for our specific installer
      for (const line of lines) {
        const match = line.trim().match(/^([a-f0-9]{64})\s+(.*)$/i);
        if (match) {
          const [, hash, filename] = match;
          // Check if this line is for our installer
          if (filename.includes(installerName) || lines.length === 1) {
            return hash.toLowerCase();
          }
        }
      }
      
      // If no match found with filename, try to find any 64-char hex string
      const hashMatch = content.match(/([a-f0-9]{64})/i);
      if (hashMatch) {
        return hashMatch[1].toLowerCase();
      }

      throw new Error('Could not parse SHA256 hash from checksum file');
    } catch (error) {
      throw new Error(`Failed to download SHA256 checksum: ${error.message}`);
    }
  }

  /**
   * Calculate SHA256 hash of a file
   */
  async calculateSHA256(filePath) {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHash('sha256');
      const stream = createReadStream(filePath);

      stream.on('data', data => hash.update(data));
      stream.on('end', () => resolve(hash.digest('hex')));
      stream.on('error', reject);
    });
  }

  /**
   * Check if file already exists and is valid
   */
  async checkExistingFile(fileName, expectedSHA256) {
    const filePath = path.join(this.downloadDir, fileName);
    
    try {
      await fs.access(filePath);
      
      // File exists, verify SHA256 if provided
      if (expectedSHA256) {
        const actualSHA256 = await this.calculateSHA256(filePath);
        if (actualSHA256.toLowerCase() === expectedSHA256.toLowerCase()) {
          return { exists: true, valid: true, path: filePath };
        } else {
          return { exists: true, valid: false, path: filePath };
        }
      }
      
      return { exists: true, valid: true, path: filePath };
    } catch (error) {
      return { exists: false, valid: false, path: filePath };
    }
  }

  /**
   * Download HandBrake installer
   */
  async downloadInstaller(downloadUrl, fileName) {
    await fs.mkdir(this.downloadDir, { recursive: true });

    const filePath = path.join(this.downloadDir, fileName);
    const writer = createWriteStream(filePath);

    try {
      const response = await axios({
        method: 'get',
        url: downloadUrl,
        responseType: 'stream',
        // Set reasonable limits for HandBrake installer size (max 500MB)
        maxContentLength: 500 * 1024 * 1024,
        maxBodyLength: 500 * 1024 * 1024
      });

      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(filePath));
        writer.on('error', reject);
      });
    } catch (error) {
      // Clean up partial download
      try {
        await fs.unlink(filePath);
      } catch (cleanupError) {
        // Ignore cleanup errors - file may not have been created
      }
      throw new Error(`Failed to download HandBrake installer: ${error.message}`);
    }
  }

  /**
   * Download latest HandBrake version with SHA256 verification
   */
  async downloadLatest(options = {}) {
    const { forceDownload = false } = options;

    try {
      // Get release information
      const releaseInfo = await this.getLatestReleaseInfo();
      
      // Get SHA256 checksum if available
      let sha256 = null;
      if (releaseInfo.sha256) {
        try {
          sha256 = await this.downloadSHA256(releaseInfo.sha256, releaseInfo.installer.name);
        } catch (error) {
          // Log warning but continue - SHA256 verification is optional but recommended
          console.error('Warning: Could not retrieve SHA256 checksum:', error.message);
        }
      }

      // Check if file already exists
      if (!forceDownload) {
        const existing = await this.checkExistingFile(releaseInfo.installer.name, sha256);
        if (existing.exists && existing.valid) {
          return {
            success: true,
            version: releaseInfo.version,
            downloadPath: existing.path,
            sha256: sha256,
            alreadyExists: true,
            downloadedAt: new Date().toISOString()
          };
        } else if (existing.exists && !existing.valid) {
          // File exists but is invalid, delete it
          await fs.unlink(existing.path);
        }
      }

      // Download the installer
      const downloadPath = await this.downloadInstaller(
        releaseInfo.installer.downloadUrl,
        releaseInfo.installer.name
      );

      // Verify SHA256 if available
      if (sha256) {
        const actualSHA256 = await this.calculateSHA256(downloadPath);
        if (actualSHA256.toLowerCase() !== sha256.toLowerCase()) {
          await fs.unlink(downloadPath);
          throw new Error('SHA256 verification failed. Downloaded file may be corrupted');
        }
      }

      return {
        success: true,
        version: releaseInfo.version,
        downloadPath: downloadPath,
        sha256: sha256,
        alreadyExists: false,
        downloadedAt: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        downloadedAt: new Date().toISOString()
      };
    }
  }
}
