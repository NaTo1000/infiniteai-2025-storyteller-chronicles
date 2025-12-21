import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import storyRoutes from './routes/stories.js';
import characterRoutes from './routes/characters.js';
import aiRoutes from './routes/ai.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*'
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(join(__dirname, '../public')));

// API Routes
app.use('/api/stories', storyRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/ai', aiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    version: '0.1.0',
    timestamp: new Date().toISOString(),
    features: {
      aiSuggestions: process.env.ENABLE_AI_SUGGESTIONS === 'true',
      collaboration: process.env.ENABLE_COLLABORATION === 'true',
      export: process.env.ENABLE_EXPORT === 'true'
    }
  });
});

// Welcome endpoint
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../public/index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: 'The requested resource does not exist'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║        📚 Storyteller Chronicles - Server Started        ║
║                                                           ║
║        Port: ${PORT}                                        ║
║        Environment: ${process.env.NODE_ENV || 'development'}                              ║
║        URL: http://localhost:${PORT}                        ║
║                                                           ║
║        Ready to help you craft amazing stories! ✨       ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

export default app;
