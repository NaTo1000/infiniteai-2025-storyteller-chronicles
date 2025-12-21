import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { StoryService } from '../services/storyService.js';

const router = express.Router();
const storyService = new StoryService();

// Get all stories
router.get('/', async (req, res, next) => {
  try {
    const { genre, author, page = 1, limit = 10 } = req.query;
    const stories = await storyService.getAll({ genre, author, page: parseInt(page), limit: parseInt(limit) });
    res.json(stories);
  } catch (error) {
    next(error);
  }
});

// Get story by ID
router.get('/:id', async (req, res, next) => {
  try {
    const story = await storyService.getById(req.params.id);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    next(error);
  }
});

// Create new story
router.post('/', async (req, res, next) => {
  try {
    const storyData = {
      id: uuidv4(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const story = await storyService.create(storyData);
    res.status(201).json(story);
  } catch (error) {
    next(error);
  }
});

// Update story
router.put('/:id', async (req, res, next) => {
  try {
    const updatedStory = await storyService.update(req.params.id, {
      ...req.body,
      updatedAt: new Date().toISOString()
    });
    if (!updatedStory) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.json(updatedStory);
  } catch (error) {
    next(error);
  }
});

// Delete story
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await storyService.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Get story statistics
router.get('/:id/stats', async (req, res, next) => {
  try {
    const stats = await storyService.getStats(req.params.id);
    if (!stats) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

export default router;
