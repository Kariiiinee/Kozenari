import { sql } from '@vercel/postgres';

export default async function handler(req: any, res: any) {
    try {
        const result = await sql`
      CREATE TABLE IF NOT EXISTS scans (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        vibe VARCHAR(50) NOT NULL,
        body TEXT,
        heart TEXT,
        environment TEXT,
        reflection TEXT,
        breath_action TEXT,
        insight TEXT,
        micro_actions JSONB
      );
    `;
        return res.status(200).json({ message: 'Table created successfully', result });
    } catch (error) {
        return res.status(500).json({ error });
    }
}
