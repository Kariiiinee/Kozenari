import { ScanData } from '../src/services/aiService';
import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { body, heart, environment, reflection, vibe } = req.body as ScanData;

  const prompt = `You are the Kozendo Wellness AI — a professional wellness coach and psychologist.
Analyze the user's check-in data and provide a deep, optimistic psychological analysis.

User Data:
- Physical: ${body}
- Emotional: ${heart}
- Environment: ${environment}
- Breathing: ${req.body.breathAction || 'not specified'}
- Reflection: ${reflection}
- Vibe: ${vibe}

Choose 2-3 micro-actions from: Extended Exhale Breathing, Unclench Check, Orient to Safety, Gentle Neck Roll, Warm Sensation, Label the Feeling, Lower the Pace, Light Exposure Reset, Power Stretch, Cold Water Splash, Name One Intention, Move One Joint, Hydration Pause, Music Micro-Boost, Define Tiny Step, 2-Minute Rule, Visual Finish, Change Location, Speak It Aloud, Remove One Obstacle, Celebrate Starting, Physiological Sigh, Dim Environment, Body Scan Lite, Write One Thought, Slow Counting Breaths, Gentle Self-Touch.

Return ONLY a JSON object (no markdown):
{
  "mainInsight": "3-4 sentence analysis blending psychology with optimism.",
  "microActions": [
    { "id": 1, "text": "Action name", "instruction": "Brief how-to", "icon": "accessibility_new" }
  ],
  "upliftingQuote": "A relevant uplifting quote."
}`;

  const API_KEY = process.env.GOOGLE_API_KEY || '';

  if (!API_KEY) {
    return res.status(500).json({
      error: 'AI Service configuration missing',
      details: 'GOOGLE_API_KEY not set in Vercel Environment Variables.'
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
      },
    });

    const rawText = response.text || '';

    if (!rawText) {
      return res.status(500).json({ error: 'Empty response from AI Service' });
    }

    // Robust JSON Extraction: Clean any markdown code block wrappers
    let cleanText = rawText.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/^```/, '').replace(/```$/, '').trim();
    }

    const insights = JSON.parse(cleanText);
    return res.status(200).json(insights);
  } catch (error: any) {
    console.error('Kozendo AI Error:', error?.message || error);
    return res.status(500).json({
      error: 'Failed to generate insights',
      details: error?.message || 'Unknown server error'
    });
  }
}
