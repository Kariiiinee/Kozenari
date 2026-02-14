import { sql } from '@vercel/postgres';

export default async function handler(req: any, res: any) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'Missing user ID' });
    }

    try {
        const result = await sql`
      SELECT * FROM scans WHERE user_id = ${userId} ORDER BY date DESC;
    `;
        return res.status(200).json({ scans: result.rows });
    } catch (error) {
        return res.status(500).json({ error });
    }
}
