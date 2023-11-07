import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import * as schema from '../db/schema';

export const config = {
  runtime: 'edge',
}

const app = new Hono().basePath('/api')

const db = drizzle(sql, { schema })

app.get('/', async (c) => {
  const result = await db.query.attack_schedule.findFirst()
  return c.json(result)
})

export default handle(app)
