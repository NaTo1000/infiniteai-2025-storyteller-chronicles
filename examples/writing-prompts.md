# Writing Prompt Templates

This file contains various writing prompt templates organized by genre and difficulty level.

## How to Use These Prompts

1. Choose a prompt that interests you
2. Use the API endpoint `/api/ai/prompts` to get more suggestions
3. Combine prompts for unique story ideas
4. Modify prompts to fit your style and preferences

## Fantasy Prompts

### Easy
- A young apprentice discovers they have the opposite magic of their master
- A dragon who's afraid of heights must save their mountain home
- A magical library where books come to life at night

### Medium
- Magic is tied to emotions, and a person who can't feel must save the world
- A warrior discovers their legendary sword is actually a cursed person
- In a world where everyone has one magical talent, someone is born with none

### Hard
- Reality splits every time a major decision is made; explore parallel timelines
- A god loses their memory and must rediscover their purpose among mortals
- Magic is dying, and mages must decide whether to let it go or sacrifice everything

## Science Fiction Prompts

### Easy
- First contact with aliens who communicate through colors
- A time traveler gets stuck in their own past
- An AI therapist becomes self-aware during a session

### Medium
- Humans discover they're living in a simulation, but some choose to stay
- A colony ship's AI falls in love with a passenger in cryosleep
- Memory uploading becomes common, but someone's stealing digital souls

### Hard
- Consciousness can be split across multiple bodies; explore identity
- The universe is a prison, and humanity discovers the bars
- Time travelers form a civilization outside linear time

## Mystery Prompts

### Easy
- A detective who can see ghosts solves cold cases
- A baker's recipes accidentally predict crimes
- Someone's imaginary friend returns with information about a murder

### Medium
- Murders occur that exactly match scenes from unpublished manuscripts
- A psychic detective realizes they're implanting false memories
- An amnesia patient must solve their own murder

### Hard
- The detective IS the criminal but doesn't remember
- Solve a murder that hasn't happened yet while causing it
- Multiple timelines converge in a single crime scene

## Romance Prompts

### Easy
- Two rivals for the same job discover they're perfect for each other
- A florist and a funeral director meet repeatedly at their work
- Pen pals who've written for years finally meet

### Medium
- Soulmates exist, but you're in love with someone who isn't yours
- A relationship that works perfectly in dreams but not in reality
- Time travelers who can only meet for one day every decade

### Hard
- Love across parallel universes where one version is dying
- A person splits into two versions who both love the same person
- Immortals who fall in love but must separate every century

## Horror Prompts

### Easy
- Your reflection starts moving independently
- A house that's bigger on the inside, and keeps growing
- Social media posts from your future self warning you

### Medium
- A town where everyone must participate in a yearly ritual or disappear
- Mirrors show not your reflection but what you could become
- A virus that makes people forget how to die

### Hard
- You're the monster in someone else's horror story
- Reality is unwinding, and you're the only one who notices
- The darkness isn't a place—it's a being, and it's hungry

## Historical Fiction Prompts

### Easy
- A time traveler accidentally changes a small detail in history
- Discover a hidden diary that reveals a different version of history
- A modern person wakes up in historical times with no way back

### Medium
- Two people from enemy nations fall in love during wartime
- A historical figure secretly had a supernatural ability
- Rewrite a famous event from the perspective of someone forgotten

### Hard
- History is being rewritten in real-time by competing time travelers
- A historian discovers all recorded history is wrong
- Multiple historical periods begin bleeding into each other

## Literary Fiction Prompts

### Easy
- A character confronts the author writing their story
- Life from the perspective of an object passed through generations
- A person discovers they're not the protagonist of their own life

### Medium
- Explore the last day of someone's life in reverse
- A character tries to escape their own metaphor
- Multiple narrators telling the same story, each believing they're right

### Hard
- A story that changes based on who's reading it
- Consciousness without identity—explore being without self
- The narrative structure itself is a character

## Thriller Prompts

### Easy
- Someone is always exactly three steps behind you
- A perfect crime goes wrong in an unexpected way
- You witness something you weren't supposed to see

### Medium
- A whistleblower realizes the conspiracy goes deeper than imagined
- Someone is framing you with evidence only you could have created
- A survival game where the audience controls the threats

### Hard
- You're the insurance policy in someone else's plan
- Everyone in your life is an actor except you
- The thriller you're reading is about you

## Character-Driven Prompts

### Relationships
- Two people who speak different languages fall in love
- Siblings separated at birth with opposite lives reunite
- A mentor realizes their student has surpassed them

### Personal Growth
- Someone must unlearn everything they believe
- A character's greatest strength becomes their weakness
- Facing the person you could have been

### Moral Dilemmas
- Save many strangers or one loved one
- Achieve your dream by betraying your values
- Tell a truth that will destroy or a lie that will save

## World-Building Prompts

### Magic Systems
- Music-based magic with different effects per genre
- Emotions become physical objects that can be traded
- Magic powered by memories you're willing to forget

### Unique Societies
- A society where lying is impossible
- A world where everyone can hear thoughts within 10 feet
- A civilization that only exists during eclipses

### Environmental
- Earth develops a consciousness and communicates
- Gravity works differently in different regions
- Time moves at different speeds in different locations

## Meta Prompts (Combine These)

- **Opposite Day**: Take any prompt and reverse the core concept
- **Genre Swap**: Apply fantasy logic to sci-fi, horror to romance, etc.
- **POV Flip**: Tell from the antagonist's or side character's perspective
- **Time Shift**: Move the setting 100 years forward or backward
- **Scale Change**: Make it more intimate or more epic
- **Tone Shift**: Make comedy serious or drama funny

## Creating Custom Prompts

### Template Structure
1. **Setup**: The initial situation
2. **Conflict**: The problem or challenge
3. **Twist**: The unexpected element
4. **Stakes**: What's at risk

### Example
- **Setup**: A teacher in a magic school
- **Conflict**: Students are more powerful than teachers
- **Twist**: The teacher has no magic but was the greatest mage
- **Stakes**: The school faces an ancient threat

## Using the API

```javascript
// Get random prompts
GET /api/ai/prompts?count=5

// Filter by genre
GET /api/ai/prompts?genre=fantasy&count=3

// Filter by difficulty
GET /api/ai/prompts?difficulty=hard&count=5

// Combine filters
GET /api/ai/prompts?genre=sci-fi&difficulty=medium&count=3
```

---

**Pro Tips:**
- Mix and match prompts from different categories
- Use prompts as starting points, not constraints
- Let characters drive the story beyond the initial prompt
- Trust your instincts—if a prompt excites you, pursue it

*Created with ❤️ by Storyteller Chronicles*
