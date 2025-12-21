# Getting Started with Storyteller Chronicles

Welcome to Storyteller Chronicles! This guide will help you get up and running quickly.

## 🚀 Quick Start (5 minutes)

### Prerequisites

Make sure you have installed:
- **Node.js** 18 or higher ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js)
- A code editor (VS Code recommended)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/NaTo1000/infiniteai-2025-storyteller-chronicles.git
cd infiniteai-2025-storyteller-chronicles
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment**
```bash
cp .env.example .env
```

4. **Start the server**
```bash
npm start
```

5. **Open your browser**
```
http://localhost:3000
```

That's it! You're ready to start creating stories! 🎉

## 📖 Using the Platform

### Via Web Interface

1. **Visit the homepage** at http://localhost:3000
2. **Try the API demos** by clicking any of the interactive buttons
3. **Explore the features** - click on the demo buttons to see the AI in action

### Via API

#### Get Writing Prompts
```bash
curl "http://localhost:3000/api/ai/prompts?genre=fantasy&count=5"
```

#### Create a Story
```bash
curl -X POST http://localhost:3000/api/stories \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Epic Tale",
    "genre": "fantasy",
    "content": "In a land far away...",
    "author": "Your Name"
  }'
```

#### Generate Plot Ideas
```bash
curl -X POST http://localhost:3000/api/ai/plot-generator \
  -H "Content-Type: application/json" \
  -d '{
    "genre": "fantasy",
    "themes": ["adventure", "discovery"],
    "setting": "a mysterious island"
  }'
```

#### Create a Character
```bash
curl -X POST http://localhost:3000/api/characters \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Elena",
    "type": "protagonist",
    "age": 25,
    "personality": {
      "traits": ["brave", "curious", "compassionate"]
    }
  }'
```

## 🎯 Common Use Cases

### 1. Overcome Writer's Block
```bash
# Get random writing prompts
curl "http://localhost:3000/api/ai/prompts?count=5"

# Generate plot ideas
curl -X POST http://localhost:3000/api/ai/plot-generator \
  -H "Content-Type: application/json" \
  -d '{"genre": "mystery"}'
```

### 2. Develop Characters
```bash
# Generate character details
curl -X POST http://localhost:3000/api/ai/character-generator \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Marcus",
    "role": "antagonist",
    "genre": "thriller"
  }'
```

### 3. Get Writing Suggestions
```bash
# Get AI suggestions
curl -X POST http://localhost:3000/api/ai/suggestions \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "How can I make my dialogue more engaging?",
    "type": "dialogue"
  }'
```

### 4. Analyze Your Writing
```bash
# Analyze writing style
curl -X POST http://localhost:3000/api/ai/style-analysis \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Your story text goes here..."
  }'
```

## 🎨 Development Commands

```bash
# Start development server (with auto-reload)
npm run dev

# Run linting
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code
npm run format

# Run tests
npm test
```

## 📚 Learning Resources

### For Writers
- Check out [examples/fantasy-story.md](../examples/fantasy-story.md) for a complete story example
- Browse [examples/writing-prompts.md](../examples/writing-prompts.md) for 100+ prompts
- Read the [User Guide](USER_GUIDE.md) for detailed feature explanations

### For Developers
- See [API.md](API.md) for complete API documentation
- Check [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines
- Review [ROADMAP.md](ROADMAP.md) for future features

## 🔧 Configuration

### Environment Variables

Edit `.env` to configure:

```bash
# Server
PORT=3000
NODE_ENV=development

# AI Integration (optional)
OPENAI_API_KEY=your_key_here
ANTHROPIC_API_KEY=your_key_here

# Features
ENABLE_AI_SUGGESTIONS=true
ENABLE_COLLABORATION=false
ENABLE_EXPORT=true
```

### Port Configuration

Change the port by setting the `PORT` environment variable:
```bash
PORT=8080 npm start
```

## 🐛 Troubleshooting

### Server won't start
- Make sure port 3000 is available
- Check that Node.js 18+ is installed: `node --version`
- Try removing `node_modules` and reinstalling: `rm -rf node_modules && npm install`

### API returns errors
- Check that the server is running
- Verify the endpoint URL is correct
- Check the request format matches the API documentation

### Can't see the web interface
- Make sure you're visiting http://localhost:3000 (not https)
- Check browser console for errors
- Try clearing browser cache

## 💡 Tips for Best Results

1. **Start Small**: Begin with simple stories and gradually increase complexity
2. **Use Prompts**: When stuck, use the writing prompts feature for inspiration
3. **Iterate**: Create multiple versions and explore different directions
4. **Organize**: Use the character and story management features to stay organized
5. **Experiment**: Try different genres and styles to find your voice

## 🎓 Next Steps

1. ✅ Complete the quick start above
2. 📖 Read the full [User Guide](USER_GUIDE.md)
3. 💡 Try all the API demo buttons on the homepage
4. ✍️ Create your first story
5. 👥 Develop some characters
6. 🌟 Share your feedback and suggestions

## 🤝 Getting Help

- **Documentation**: Check the `docs/` folder
- **Issues**: [Open an issue](https://github.com/NaTo1000/infiniteai-2025-storyteller-chronicles/issues)
- **Discussions**: [GitHub Discussions](https://github.com/NaTo1000/infiniteai-2025-storyteller-chronicles/discussions)

## 🌟 Share Your Stories

We'd love to hear about what you create with Storyteller Chronicles! Share your experiences and help us make this platform even better.

---

**Happy Writing! May your creativity flow and your stories inspire! ✨**

*Made with ❤️ for storytellers everywhere*
