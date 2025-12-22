# HandBrake Download Service

This feature provides automatic download and verification of the latest HandBrake for Windows.

## API Endpoints

### GET /api/tools/handbrake/latest

Get information about the latest HandBrake release without downloading.

**Response:**
```json
{
  "success": true,
  "version": "1.7.2",
  "name": "HandBrake 1.7.2",
  "publishedAt": "2023-12-15T10:00:00Z",
  "installer": {
    "name": "HandBrake-1.7.2-x86_64-Win_GUI.exe",
    "size": 15234567,
    "downloadUrl": "https://github.com/HandBrake/HandBrake/releases/download/..."
  },
  "sha256Available": true
}
```

**Example:**
```bash
curl http://localhost:3000/api/tools/handbrake/latest
```

### POST /api/tools/handbrake/download

Download the latest HandBrake installer with SHA256 verification.

**Request Body:**
```json
{
  "forceDownload": false  // Optional: set to true to re-download even if file exists
}
```

**Response (Success):**
```json
{
  "success": true,
  "version": "1.7.2",
  "downloadPath": "/path/to/downloads/handbrake/HandBrake-1.7.2-x86_64-Win_GUI.exe",
  "sha256": "abc123def456...",
  "alreadyExists": false,
  "downloadedAt": "2025-12-22T10:30:00Z"
}
```

**Response (Already Downloaded):**
```json
{
  "success": true,
  "version": "1.7.2",
  "downloadPath": "/path/to/downloads/handbrake/HandBrake-1.7.2-x86_64-Win_GUI.exe",
  "sha256": "abc123def456...",
  "alreadyExists": true,
  "downloadedAt": "2025-12-22T10:30:00Z"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Failed to fetch HandBrake release information: ...",
  "downloadedAt": "2025-12-22T10:30:00Z"
}
```

**Example:**
```bash
# Download latest version
curl -X POST http://localhost:3000/api/tools/handbrake/download \
  -H "Content-Type: application/json" \
  -d '{}'

# Force re-download
curl -X POST http://localhost:3000/api/tools/handbrake/download \
  -H "Content-Type: application/json" \
  -d '{"forceDownload": true}'
```

## Features

- ✅ Automatic detection of latest HandBrake release from GitHub
- ✅ Windows installer (.exe) identification
- ✅ SHA256 checksum verification
- ✅ Prevents duplicate downloads (checks existing files)
- ✅ Comprehensive error handling
- ✅ Network error resilience

## Security

### SHA256 Verification
All downloaded files are verified using SHA256 checksums from the official HandBrake release:
- Checksums are downloaded from GitHub release assets
- Downloads are verified before being saved
- Corrupted downloads are automatically rejected

### Rate Limiting
**Note:** Production deployments should implement rate limiting on these endpoints to prevent:
- Abuse and excessive API calls to GitHub
- Resource exhaustion from large file downloads

Consider using `express-rate-limit` or similar middleware.

## Error Handling

The service handles the following error scenarios:

1. **GitHub API Rate Limit**: Returns a clear error message when rate limit is exceeded
2. **Network Errors**: Catches and reports connection issues
3. **Invalid Downloads**: Verifies SHA256 and rejects corrupted files
4. **Missing Assets**: Reports when Windows installer is not found in release
5. **Partial Downloads**: Automatically cleans up failed downloads

## File Storage

Downloads are saved to: `downloads/handbrake/`

This directory is automatically created if it doesn't exist and is excluded from git via `.gitignore`.

## Dependencies

- **axios** (^1.12.0): HTTP client for API requests and file downloads
- **crypto** (built-in): SHA256 hash calculation
- **fs/promises** (built-in): File system operations

## GitHub API

The service uses the GitHub REST API:
- Endpoint: `https://api.github.com/repos/HandBrake/HandBrake/releases/latest`
- No authentication required (subject to rate limits)
- Rate limit: ~60 requests per hour for unauthenticated requests

To avoid rate limits, consider:
1. Adding GitHub token authentication (increases limit to 5000/hour)
2. Implementing caching for release information
3. Using the `If-Modified-Since` header for conditional requests
