export class CharacterService {
  constructor() {
    // In-memory storage for now
    this.characters = new Map();
    this.relationships = new Map();
  }

  async getAll({ storyId, type }) {
    let characters = Array.from(this.characters.values());

    // Filter by story
    if (storyId) {
      characters = characters.filter(char => char.storyId === storyId);
    }

    // Filter by type (protagonist, antagonist, supporting, etc.)
    if (type) {
      characters = characters.filter(char => char.type?.toLowerCase() === type.toLowerCase());
    }

    return { characters };
  }

  async getById(id) {
    return this.characters.get(id) || null;
  }

  async create(characterData) {
    const character = {
      id: characterData.id,
      name: characterData.name || 'Unnamed Character',
      storyId: characterData.storyId,
      type: characterData.type || 'supporting',
      age: characterData.age,
      gender: characterData.gender,
      species: characterData.species || 'human',
      appearance: characterData.appearance || {},
      personality: characterData.personality || {
        traits: [],
        strengths: [],
        weaknesses: [],
        fears: [],
        desires: []
      },
      background: characterData.background || '',
      occupation: characterData.occupation,
      skills: characterData.skills || [],
      relationships: characterData.relationships || [],
      arc: characterData.arc || '',
      notes: characterData.notes || '',
      createdAt: characterData.createdAt,
      updatedAt: characterData.updatedAt
    };

    this.characters.set(character.id, character);
    return character;
  }

  async update(id, updates) {
    const character = this.characters.get(id);
    if (!character) return null;

    const updatedCharacter = {
      ...character,
      ...updates,
      id: character.id,
      createdAt: character.createdAt
    };

    this.characters.set(id, updatedCharacter);
    return updatedCharacter;
  }

  async delete(id) {
    return this.characters.delete(id);
  }

  async getRelationships(characterId) {
    const character = this.characters.get(characterId);
    if (!character) return null;

    const characterRelationships = character.relationships || [];
    
    // Enrich relationships with character details
    const enrichedRelationships = characterRelationships.map(rel => {
      const relatedCharacter = this.characters.get(rel.characterId);
      return {
        ...rel,
        character: relatedCharacter ? {
          id: relatedCharacter.id,
          name: relatedCharacter.name,
          type: relatedCharacter.type
        } : null
      };
    });

    return {
      characterId,
      characterName: character.name,
      relationships: enrichedRelationships
    };
  }

  async createRelationship(characterId1, characterId2, relationshipData) {
    const char1 = this.characters.get(characterId1);
    const char2 = this.characters.get(characterId2);
    
    if (!char1 || !char2) return null;

    const relationship = {
      characterId: characterId2,
      type: relationshipData.type || 'acquaintance',
      description: relationshipData.description || '',
      strength: relationshipData.strength || 'neutral'
    };

    if (!char1.relationships) char1.relationships = [];
    char1.relationships.push(relationship);

    return relationship;
  }
}
