# infiniteai-2025-storyteller-chronicles

An AI-enhanced storytelling platform with integrated tools for creative writers.

## Features

- 📚 **AI-Enhanced Writing**: Advanced storytelling tools and suggestions
- 🎬 **HandBrake Integration**: Automatic download and verification of HandBrake for Windows
- ✨ **Creative Tools**: A comprehensive suite of tools for content creators

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Access the application:**
   Open http://localhost:3000 in your browser

## HandBrake Download Service

The application includes automatic HandBrake download functionality:

- **GET** `/api/tools/handbrake/latest` - Get latest version info
- **POST** `/api/tools/handbrake/download` - Download and verify HandBrake installer

See [HandBrake Service Documentation](docs/HANDBRAKE_SERVICE.md) for detailed usage.

## Development

```bash
# Start in development mode with auto-reload
npm run dev

# Run linting
npm run lint

# Format code
npm run format
```

## License

Apache-2.0 - This project is a labor of love for the storytelling community.
