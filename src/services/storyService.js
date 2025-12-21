export class StoryService {
  constructor() {
    // In-memory storage for now (can be replaced with database later)
    this.stories = new Map();
  }

  async getAll({ genre, author, page = 1, limit = 10 }) {
    let stories = Array.from(this.stories.values());

    // Filter by genre
    if (genre) {
      stories = stories.filter(story => story.genre?.toLowerCase() === genre.toLowerCase());
    }

    // Filter by author
    if (author) {
      stories = stories.filter(story => story.author?.toLowerCase().includes(author.toLowerCase()));
    }

    // Sort by updated date (most recent first)
    stories.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedStories = stories.slice(startIndex, endIndex);

    return {
      stories: paginatedStories,
      pagination: {
        total: stories.length,
        page,
        limit,
        totalPages: Math.ceil(stories.length / limit)
      }
    };
  }

  async getById(id) {
    return this.stories.get(id) || null;
  }

  async create(storyData) {
    const story = {
      id: storyData.id,
      title: storyData.title || 'Untitled Story',
      content: storyData.content || '',
      genre: storyData.genre || 'general',
      author: storyData.author || 'Anonymous',
      synopsis: storyData.synopsis || '',
      tags: storyData.tags || [],
      characters: storyData.characters || [],
      setting: storyData.setting || '',
      status: storyData.status || 'draft',
      createdAt: storyData.createdAt,
      updatedAt: storyData.updatedAt,
      metadata: {
        wordCount: this.countWords(storyData.content || ''),
        version: 1
      }
    };

    this.stories.set(story.id, story);
    return story;
  }

  async update(id, updates) {
    const story = this.stories.get(id);
    if (!story) return null;

    const updatedStory = {
      ...story,
      ...updates,
      id: story.id, // Ensure ID doesn't change
      createdAt: story.createdAt, // Ensure createdAt doesn't change
      metadata: {
        ...story.metadata,
        wordCount: this.countWords(updates.content || story.content),
        version: story.metadata.version + 1
      }
    };

    this.stories.set(id, updatedStory);
    return updatedStory;
  }

  async delete(id) {
    return this.stories.delete(id);
  }

  async getStats(id) {
    const story = this.stories.get(id);
    if (!story) return null;

    const content = story.content || '';
    const words = content.split(/\s+/).filter(word => word.length > 0);
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const paragraphs = content.split(/\n\n+/).filter(p => p.trim().length > 0);

    return {
      storyId: id,
      title: story.title,
      statistics: {
        wordCount: words.length,
        characterCount: content.length,
        sentenceCount: sentences.length,
        paragraphCount: paragraphs.length,
        averageWordsPerSentence: sentences.length > 0 ? Math.round(words.length / sentences.length) : 0,
        estimatedReadingTime: Math.ceil(words.length / 200) // Assuming 200 words per minute
      },
      metadata: {
        genre: story.genre,
        status: story.status,
        characterCount: story.characters?.length || 0,
        tags: story.tags,
        createdAt: story.createdAt,
        updatedAt: story.updatedAt
      }
    };
  }

  countWords(text) {
    return text.split(/\s+/).filter(word => word.length > 0).length;
  }
}
