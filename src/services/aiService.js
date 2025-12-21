export class AIService {
  constructor() {
    this.enabled = process.env.ENABLE_AI_SUGGESTIONS === 'true';
  }

  async generateSuggestions({ prompt, context, type }) {
    if (!this.enabled) {
      return this.getMockSuggestions(type);
    }

    // This is where you'd integrate with actual AI APIs (OpenAI, Anthropic, etc.)
    // For now, returning intelligent mock suggestions
    return this.getMockSuggestions(type, prompt, context);
  }

  async generateCharacter({ name, role, genre, traits }) {
    const characterTemplate = {
      name,
      type: role || 'supporting',
      personality: {
        traits: traits || this.getRandomTraits(),
        strengths: this.getRandomStrengths(),
        weaknesses: this.getRandomWeaknesses(),
        fears: ['the unknown', 'failure'],
        desires: ['recognition', 'safety']
      },
      background: `${name} is a compelling character in this ${genre || 'fantasy'} story with a rich history and complex motivations.`,
      appearance: {
        height: 'average',
        build: 'athletic',
        distinctiveFeatures: 'piercing eyes that seem to see through deception'
      },
      arc: 'From uncertainty to confidence, learning to trust their instincts.'
    };

    return {
      success: true,
      character: characterTemplate,
      suggestions: [
        'Consider giving this character a memorable quirk or habit',
        'Develop their relationship with the protagonist',
        'Think about what they stand to lose in the story'
      ]
    };
  }

  async generatePlot({ genre, themes, setting }) {
    const plotIdeas = [
      {
        title: 'The Journey Begins',
        hook: `In ${setting || 'a world on the brink'}, an unlikely hero discovers a truth that changes everything.`,
        conflict: 'Forces of opposition gather strength',
        resolution: 'A choice between safety and destiny',
        acts: [
          'Introduction and call to adventure',
          'Trials and gathering of allies',
          'Confrontation and transformation'
        ]
      },
      {
        title: 'Shadows of the Past',
        hook: 'A forgotten secret resurfaces with dangerous consequences.',
        conflict: 'The past refuses to stay buried',
        resolution: 'Confronting what was lost to forge a new future',
        acts: [
          'Discovery of the mystery',
          'Unraveling connections',
          'Final revelation and choice'
        ]
      },
      {
        title: 'The Price of Power',
        hook: 'Obtaining what they desire comes with an unexpected cost.',
        conflict: 'The corruption of good intentions',
        resolution: 'Redemption through sacrifice',
        acts: [
          'The temptation and acceptance',
          'The gradual transformation',
          'The moment of truth'
        ]
      }
    ];

    return {
      genre: genre || 'general',
      themes: themes || ['growth', 'choice', 'consequence'],
      plotIdeas,
      tips: [
        'Build tension gradually throughout each act',
        'Ensure character decisions drive the plot forward',
        'Plant seeds early that will pay off later',
        'Give your protagonist agency in their own story'
      ]
    };
  }

  async analyzeStyle(text) {
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;
    const avgSentenceLength = words.length / sentences.length;

    let readabilityLevel = 'medium';
    if (avgSentenceLength < 15 && avgWordLength < 5) readabilityLevel = 'easy';
    if (avgSentenceLength > 25 || avgWordLength > 6) readabilityLevel = 'complex';

    return {
      statistics: {
        wordCount: words.length,
        sentenceCount: sentences.length,
        averageWordLength: avgWordLength.toFixed(2),
        averageSentenceLength: avgSentenceLength.toFixed(2)
      },
      style: {
        readabilityLevel,
        tone: this.detectTone(text),
        pacing: avgSentenceLength < 15 ? 'fast' : avgSentenceLength > 25 ? 'slow' : 'moderate'
      },
      suggestions: [
        'Vary sentence length for better rhythm',
        'Consider adding more sensory details',
        'Strong opening - maintain this energy',
        'Show emotion through action and dialogue'
      ]
    };
  }

  async getWritingPrompts({ genre, difficulty, count }) {
    const prompts = [
      { text: 'Write about a character who discovers they can hear others\' thoughts, but only lies.', difficulty: 'medium', genre: 'fantasy' },
      { text: 'A detective solves crimes by entering victims\' last memories.', difficulty: 'hard', genre: 'mystery' },
      { text: 'In a world where emotions are visible as colors, someone is born colorless.', difficulty: 'medium', genre: 'sci-fi' },
      { text: 'Two rivals must work together when they realize they\'re from parallel timelines.', difficulty: 'hard', genre: 'sci-fi' },
      { text: 'A librarian discovers books that write themselves based on readers\' desires.', difficulty: 'easy', genre: 'fantasy' },
      { text: 'The last person on Earth receives a phone call.', difficulty: 'medium', genre: 'horror' },
      { text: 'A chef\'s meals make people experience their happiest memories.', difficulty: 'easy', genre: 'contemporary' },
      { text: 'Someone wakes up with a different superpower each day, but no control over which one.', difficulty: 'medium', genre: 'fantasy' }
    ];

    let filtered = prompts;
    if (genre) {
      filtered = filtered.filter(p => p.genre === genre);
    }
    if (difficulty) {
      filtered = filtered.filter(p => p.difficulty === difficulty);
    }

    // Shuffle and return requested count
    filtered = filtered.sort(() => Math.random() - 0.5).slice(0, count);

    return { prompts: filtered, total: filtered.length };
  }

  async continueStory({ text, style, length }) {
    // This would integrate with AI API in production
    const continuations = {
      short: 'The silence that followed was deafening. Every eye turned toward the doorway, where a figure emerged from the shadows.',
      medium: 'The silence that followed was deafening. Every eye turned toward the doorway, where a figure emerged from the shadows, moving with a grace that seemed almost otherworldly. The newcomer paused, surveying the room with an expression that revealed nothing, yet somehow promised everything.',
      long: 'The silence that followed was deafening. Every eye turned toward the doorway, where a figure emerged from the shadows, moving with a grace that seemed almost otherworldly. The newcomer paused, surveying the room with an expression that revealed nothing, yet somehow promised everything. Time seemed to stretch as they stood there, and in that moment, everyone present understood that nothing would ever be the same again. The air itself felt charged with possibility and danger in equal measure.'
    };

    return {
      original: text.slice(-200), // Last 200 chars for context
      continuation: continuations[length] || continuations.medium,
      style: style || 'narrative',
      suggestions: [
        'Consider the emotional impact of this moment',
        'This is a great place to reveal character through reaction',
        'Build tension before providing resolution'
      ]
    };
  }

  // Helper methods
  getMockSuggestions(type, prompt, context) {
    const suggestions = {
      plot: [
        'Introduce a unexpected twist that challenges the protagonist\'s beliefs',
        'Consider raising the stakes by threatening what the character values most',
        'Add a subplot that mirrors the main conflict in a different context'
      ],
      character: [
        'Give this character a distinctive voice or speech pattern',
        'Create a meaningful internal conflict that complements the external one',
        'Consider how their past shapes their current decisions'
      ],
      dialogue: [
        'Let characters speak indirectly about their true feelings',
        'Use subtext - what they don\'t say is often more important',
        'Give each character a unique way of expressing themselves'
      ],
      general: [
        'Show, don\'t tell - let actions reveal character and emotion',
        'Build tension through delayed gratification',
        'Use specific, concrete details to make scenes vivid',
        'Every scene should advance plot or develop character'
      ]
    };

    return {
      type,
      suggestions: suggestions[type] || suggestions.general,
      context: context || 'general writing'
    };
  }

  getRandomTraits() {
    const traits = ['brave', 'curious', 'compassionate', 'analytical', 'creative', 'stubborn', 'loyal', 'witty'];
    return traits.sort(() => Math.random() - 0.5).slice(0, 3);
  }

  getRandomStrengths() {
    return ['quick thinking', 'empathy', 'determination'];
  }

  getRandomWeaknesses() {
    return ['self-doubt', 'impulsiveness', 'trust issues'];
  }

  detectTone(text) {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('dark') || lowerText.includes('shadow')) return 'dark';
    if (lowerText.includes('joy') || lowerText.includes('bright')) return 'uplifting';
    if (lowerText.includes('mystery') || lowerText.includes('strange')) return 'mysterious';
    return 'neutral';
  }
}
