import express from 'express';
import { HandbrakeService } from '../services/handbrakeService.js';

const router = express.Router();
const handbrakeService = new HandbrakeService();

// NOTE: Production deployments should implement rate limiting on these endpoints
// to prevent abuse and excessive API calls to GitHub.
// Consider using express-rate-limit or similar middleware.

/**
 * GET /api/tools/handbrake/latest
 * Get latest HandBrake version information without downloading
 */
router.get('/handbrake/latest', async (req, res, next) => {
  try {
    const releaseInfo = await handbrakeService.getLatestReleaseInfo();
    
    res.json({
      success: true,
      version: releaseInfo.version,
      name: releaseInfo.name,
      publishedAt: releaseInfo.publishedAt,
      installer: {
        name: releaseInfo.installer.name,
        size: releaseInfo.installer.size,
        downloadUrl: releaseInfo.installer.downloadUrl
      },
      sha256Available: !!releaseInfo.sha256
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/tools/handbrake/download
 * Download the latest HandBrake installer
 */
router.post('/handbrake/download', async (req, res, next) => {
  try {
    const { forceDownload = false } = req.body;
    
    const result = await handbrakeService.downloadLatest({ forceDownload });
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
