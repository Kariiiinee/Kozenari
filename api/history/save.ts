import { sql } from '@vercel/postgres';

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { userId, vibe, body, heart, environment, reflection, breathAction, insight, microActions } = req.body;

    if (!userId || !vibe) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const result = await sql`
      INSERT INTO scans (user_id, vibe, body, heart, environment, reflection, breath_action, insight, micro_actions)
      VALUES (${userId}, ${vibe}, ${body}, ${heart}, ${environment}, ${reflection}, ${breathAction}, ${insight}, ${JSON.stringify(microActions)})
      RETURNING *;
    `;
        return res.status(201).json({ scan: result.rows[0] });
    } catch (error) {
        return res.status(500).json({ error });
    }
}
