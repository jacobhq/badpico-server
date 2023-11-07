import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import * as schema from '../db/schema';
import { desc } from 'drizzle-orm';

export const config = {
  runtime: 'edge',
}

const app = new Hono().basePath('/api')

const db = drizzle(sql, { schema })

app.get('/', async (c) => {
  const result = await db.query.attack_schedule.findFirst({
    orderBy: desc(schema.attack_schedule.id)
  })
  return c.json(result)
})

export default handle(app)
