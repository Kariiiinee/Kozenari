import { ScanData, AIInsight } from '../src/services/aiService';

// This is a Vercel Serverless Function template for Claude integration
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { body, heart, environment, reflection, vibe } = req.body as ScanData;

  const prompt = `
    You are the Kozendo Wellness AI, a professional wellness coach. 
    Based on the following user check-in data, generate a personalized wellness insight, 2 or 3 micro-actions, and an uplifting quote.
    
    User Data:
    - Physical State: ${body}
    - Emotional State: ${heart}
    - Environment: ${environment}
    - Daily Reflection: ${reflection}
    - Overall Vibe: ${vibe}

    AVAILABLE MICRO-ACTIONS (Choose 2-3 most relevant):
    [LOWER CORTISOL - Stress/Anxiety/Tension]
    - Extended Exhale Breathing (1–2 min): Inhale 4 · Exhale 6–8
    - Unclench Check (30 sec): Relax jaw, shoulders, hands, belly
    - Orient to Safety (1 min): Name 3 neutral/pleasant things nearby
    - Gentle Neck Roll (1 min): Slow, pain-free circles
    - Warm Sensation (2 min): Hold a warm mug/hands on chest
    - Label the Feeling (30 sec): "Right now, I feel ___, and I’m okay."
    - Lower the Pace (1 min): Intentionally slow next movement

    [FEEL ENERGIZED - Fatigue/Lethargy/Morning]
    - Light Exposure Reset (2 min): Step outside or near a window
    - Power Stretch (1 min): Reach up, open chest
    - Cold Water Splash (30 sec): Face or wrists with cool water
    - Name One Intention (30 sec): "What matters most right now?"
    - Move One Joint (1 min): Rotate ankles, wrists, shoulders
    - Hydration Pause (1 min): Drink water slowly
    - Music Micro-Boost (2 min): Play one uplifting song

    [BE MOTIVATED - Procrastination/Stuck]
    - Define Tiny Step (30 sec): Make it almost too easy
    - 2-Minute Rule: Start for just two minutes
    - Visual Finish (1 min): Picture the task done
    - Change Location (1 min): Stand up, shift rooms
    - Speak It Aloud (30 sec): "I’m starting now."
    - Remove One Obstacle (1 min): Close one tab, clear one item
    - Celebrate Starting (10 sec): Acknowledge effort

    [HELP TO SLEEP - Night/Restless]
    - Physiological Sigh (1 min): Two short inhales, long exhale
    - Dim Environment (2 min): Lower lights
    - Body Scan Lite (2 min): Relax forehead to legs
    - Write One Thought (1 min): "Tomorrow, I’ll handle this."
    - Slow Counting Breaths (2 min): Count exhales 10 to 1
    - Gentle Self-Touch (1 min): Hand on chest or belly

    Return EXACTLY a JSON object:
    {
      "mainInsight": "A thoughtful 1-2 sentence acknowledgment.",
      "microActions": [
        { "id": 1, "text": "Action label", "icon": "accessibility_new | water_drop | air" }
      ],
      "upliftingQuote": "A short, relevant quote.",
      "recommendedActivity": {
        "title": "Activity name",
        "duration": "Duration",
        "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"
      }
    }
    
    Choose actions that directly address the user's specific input.
  `;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    // Parse the Claude response content as JSON
    const content = data.content[0].text;
    const insights = JSON.parse(content);

    return res.status(200).json(insights);
  } catch (error) {
    console.error('Claude API Error:', error);
    return res.status(500).json({ error: 'Failed to generate insights' });
  }
}
