# API Documentation

Welcome to the Storyteller Chronicles API documentation. This API provides endpoints for story management, character development, and AI-assisted writing features.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Currently, the API does not require authentication. Authentication will be added in future versions.

## Endpoints

### Health Check

Check the API status and available features.

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "healthy",
  "version": "0.1.0",
  "timestamp": "2025-12-21T18:00:00.000Z",
  "features": {
    "aiSuggestions": true,
    "collaboration": false,
    "export": true
  }
}
```

---

## Stories API

### Get All Stories

Retrieve a list of all stories with optional filtering.

**Endpoint:** `GET /stories`

**Query Parameters:**
- `genre` (optional): Filter by genre
- `author` (optional): Filter by author name
- `page` (optional, default: 1): Page number
- `limit` (optional, default: 10): Results per page

**Example:**
```bash
curl http://localhost:3000/api/stories?genre=fantasy&limit=5
```

**Response:**
```json
{
  "stories": [
    {
      "id": "uuid",
      "title": "The Last Chronicle",
      "content": "Story content...",
      "genre": "fantasy",
      "author": "John Doe",
      "status": "draft",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-02T00:00:00.000Z",
      "metadata": {
        "wordCount": 1500,
        "version": 1
      }
    }
  ],
  "pagination": {
    "total": 10,
    "page": 1,
    "limit": 5,
    "totalPages": 2
  }
}
```

### Get Story by ID

**Endpoint:** `GET /stories/:id`

**Example:**
```bash
curl http://localhost:3000/api/stories/123e4567-e89b-12d3-a456-426614174000
```

### Create Story

**Endpoint:** `POST /stories`

**Body:**
```json
{
  "title": "My New Story",
  "content": "Once upon a time...",
  "genre": "fantasy",
  "author": "Jane Doe",
  "synopsis": "A brief description",
  "tags": ["adventure", "magic"],
  "setting": "A magical kingdom"
}
```

### Update Story

**Endpoint:** `PUT /stories/:id`

**Body:** Same as create, all fields optional

### Delete Story

**Endpoint:** `DELETE /stories/:id`

### Get Story Statistics

**Endpoint:** `GET /stories/:id/stats`

**Response:**
```json
{
  "storyId": "uuid",
  "title": "My Story",
  "statistics": {
    "wordCount": 1500,
    "characterCount": 8500,
    "sentenceCount": 75,
    "paragraphCount": 20,
    "averageWordsPerSentence": 20,
    "estimatedReadingTime": 8
  }
}
```

---

## Characters API

### Get All Characters

**Endpoint:** `GET /characters`

**Query Parameters:**
- `storyId` (optional): Filter by story
- `type` (optional): Filter by character type (protagonist, antagonist, supporting)

### Get Character by ID

**Endpoint:** `GET /characters/:id`

### Create Character

**Endpoint:** `POST /characters`

**Body:**
```json
{
  "name": "Aria",
  "storyId": "story-uuid",
  "type": "protagonist",
  "age": 22,
  "gender": "female",
  "appearance": {
    "height": "average",
    "build": "athletic",
    "distinctiveFeatures": "piercing eyes"
  },
  "personality": {
    "traits": ["brave", "curious"],
    "strengths": ["quick thinking"],
    "weaknesses": ["impulsive"],
    "fears": ["failure"],
    "desires": ["adventure"]
  },
  "background": "Character background story...",
  "occupation": "Librarian",
  "skills": ["research", "ancient languages"]
}
```

### Update Character

**Endpoint:** `PUT /characters/:id`

### Delete Character

**Endpoint:** `DELETE /characters/:id`

### Get Character Relationships

**Endpoint:** `GET /characters/:id/relationships`

---

## AI Assistant API

### Generate Writing Suggestions

Get AI-powered writing suggestions.

**Endpoint:** `POST /ai/suggestions`

**Body:**
```json
{
  "prompt": "How can I improve my character development?",
  "context": "Writing a fantasy novel",
  "type": "character"
}
```

**Types:** `general`, `plot`, `character`, `dialogue`

**Response:**
```json
{
  "type": "character",
  "suggestions": [
    "Give this character a distinctive voice or speech pattern",
    "Create a meaningful internal conflict",
    "Consider how their past shapes current decisions"
  ],
  "context": "character development"
}
```

### Generate Character Details

**Endpoint:** `POST /ai/character-generator`

**Body:**
```json
{
  "name": "Marcus",
  "role": "antagonist",
  "genre": "sci-fi",
  "traits": ["intelligent", "ruthless"]
}
```

### Generate Plot Ideas

**Endpoint:** `POST /ai/plot-generator`

**Body:**
```json
{
  "genre": "fantasy",
  "themes": ["redemption", "sacrifice"],
  "setting": "a dying world"
}
```

**Response:**
```json
{
  "genre": "fantasy",
  "themes": ["redemption", "sacrifice"],
  "plotIdeas": [
    {
      "title": "The Last Hope",
      "hook": "A former villain must save the world they once tried to destroy",
      "conflict": "No one trusts them",
      "resolution": "Sacrifice for redemption",
      "acts": ["Act 1", "Act 2", "Act 3"]
    }
  ]
}
```

### Analyze Writing Style

**Endpoint:** `POST /ai/style-analysis`

**Body:**
```json
{
  "text": "Your story text here..."
}
```

### Get Writing Prompts

**Endpoint:** `GET /ai/prompts`

**Query Parameters:**
- `genre` (optional): Filter by genre
- `difficulty` (optional): easy, medium, hard
- `count` (optional, default: 5): Number of prompts

**Example:**
```bash
curl "http://localhost:3000/api/ai/prompts?genre=fantasy&difficulty=medium&count=3"
```

### Continue Story

Get AI suggestions for continuing your story.

**Endpoint:** `POST /ai/continue`

**Body:**
```json
{
  "text": "The last paragraph of your story...",
  "style": "narrative",
  "length": "medium"
}
```

**Lengths:** `short`, `medium`, `long`

---

## Error Responses

All endpoints may return these error responses:

**400 Bad Request**
```json
{
  "error": "Invalid input",
  "message": "Detailed error message"
}
```

**404 Not Found**
```json
{
  "error": "Not Found",
  "message": "The requested resource does not exist"
}
```

**500 Internal Server Error**
```json
{
  "error": "Internal Server Error",
  "message": "Error details..."
}
```

---

## Rate Limiting

Currently, there are no rate limits. This will be implemented in future versions.

## CORS

The API supports CORS. Allowed origins can be configured via the `ALLOWED_ORIGINS` environment variable.

## Examples

### Create a Complete Story Workflow

```bash
# 1. Create a story
curl -X POST http://localhost:3000/api/stories \
  -H "Content-Type: application/json" \
  -d '{"title": "My Fantasy Tale", "genre": "fantasy"}'

# 2. Generate plot ideas
curl -X POST http://localhost:3000/api/ai/plot-generator \
  -H "Content-Type: application/json" \
  -d '{"genre": "fantasy", "themes": ["adventure"]}'

# 3. Create a character
curl -X POST http://localhost:3000/api/characters \
  -H "Content-Type: application/json" \
  -d '{"name": "Hero", "storyId": "story-id", "type": "protagonist"}'

# 4. Get writing prompts
curl "http://localhost:3000/api/ai/prompts?genre=fantasy&count=5"

# 5. Get story statistics
curl http://localhost:3000/api/stories/story-id/stats
```

---

## Future API Features

Coming soon:
- User authentication and authorization
- Real-time collaboration endpoints
- Export format endpoints
- Advanced search and filtering
- WebSocket support for live updates

---

*For more information, visit the [GitHub repository](https://github.com/NaTo1000/infiniteai-2025-storyteller-chronicles)*
