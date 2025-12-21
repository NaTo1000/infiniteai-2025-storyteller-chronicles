import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { CharacterService } from '../services/characterService.js';

const router = express.Router();
const characterService = new CharacterService();

// Get all characters
router.get('/', async (req, res, next) => {
  try {
    const { storyId, type } = req.query;
    const characters = await characterService.getAll({ storyId, type });
    res.json(characters);
  } catch (error) {
    next(error);
  }
});

// Get character by ID
router.get('/:id', async (req, res, next) => {
  try {
    const character = await characterService.getById(req.params.id);
    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }
    res.json(character);
  } catch (error) {
    next(error);
  }
});

// Create new character
router.post('/', async (req, res, next) => {
  try {
    const characterData = {
      id: uuidv4(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const character = await characterService.create(characterData);
    res.status(201).json(character);
  } catch (error) {
    next(error);
  }
});

// Update character
router.put('/:id', async (req, res, next) => {
  try {
    const updatedCharacter = await characterService.update(req.params.id, {
      ...req.body,
      updatedAt: new Date().toISOString()
    });
    if (!updatedCharacter) {
      return res.status(404).json({ error: 'Character not found' });
    }
    res.json(updatedCharacter);
  } catch (error) {
    next(error);
  }
});

// Delete character
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await characterService.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Character not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Get character relationships
router.get('/:id/relationships', async (req, res, next) => {
  try {
    const relationships = await characterService.getRelationships(req.params.id);
    res.json(relationships);
  } catch (error) {
    next(error);
  }
});

export default router;
