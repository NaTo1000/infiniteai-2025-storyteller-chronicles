import express from 'express';
import { AIService } from '../services/aiService.js';

const router = express.Router();
const aiService = new AIService();

// Generate story suggestions
router.post('/suggestions', async (req, res, next) => {
  try {
    const { prompt, context, type = 'general' } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const suggestions = await aiService.generateSuggestions({ prompt, context, type });
    res.json(suggestions);
  } catch (error) {
    next(error);
  }
});

// Generate character details
router.post('/character-generator', async (req, res, next) => {
  try {
    const { name, role, genre, traits } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Character name is required' });
    }

    const character = await aiService.generateCharacter({ name, role, genre, traits });
    res.json(character);
  } catch (error) {
    next(error);
  }
});

// Generate plot ideas
router.post('/plot-generator', async (req, res, next) => {
  try {
    const { genre, themes, setting } = req.body;
    
    const plotIdeas = await aiService.generatePlot({ genre, themes, setting });
    res.json(plotIdeas);
  } catch (error) {
    next(error);
  }
});

// Analyze writing style
router.post('/style-analysis', async (req, res, next) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required for analysis' });
    }

    const analysis = await aiService.analyzeStyle(text);
    res.json(analysis);
  } catch (error) {
    next(error);
  }
});

// Get writing prompts
router.get('/prompts', async (req, res, next) => {
  try {
    const { genre, difficulty = 'medium', count = 5 } = req.query;
    const prompts = await aiService.getWritingPrompts({ genre, difficulty, count: parseInt(count) });
    res.json(prompts);
  } catch (error) {
    next(error);
  }
});

// Continue story
router.post('/continue', async (req, res, next) => {
  try {
    const { text, style, length = 'medium' } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Story text is required' });
    }

    const continuation = await aiService.continueStory({ text, style, length });
    res.json(continuation);
  } catch (error) {
    next(error);
  }
});

export default router;
