import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import * as schema from '../db/schema';
import { desc, eq, gt } from 'drizzle-orm';

export const config = {
  runtime: 'edge',
}

type Time = {
  abbreviation: string
  client_ip: string,
  // we only send the client its datetime
  datetime: string,
  day_of_week: number,
  day_of_year: number,
  dst: boolean,
  dst_from?: string,
  dst_offset: number,
  dst_until?: string,
  raw_offset: number,
  timezone: string,
  unixtime: number,
  utc_datetime: string,
  utc_offset: string,
  week_number: number
}

const app = new Hono().basePath('/api')
const db = drizzle(sql, { schema })

app.get("/", (c) => c.redirect("/api/attack/current"))

app.get('/attack/current', async (c) => {
  // Get current attack
  // TODO - implement scheduling
  // const response = await fetch("http://worldtimeapi.org/api/timezone/Europe/London")
  // const time: Time = await response.json()
  
  const result = await db.query.attacks.findFirst({
    orderBy: desc(schema.attacks.start),
    where: eq(schema.attacks.in_progress, true),
  })

  return c.json(result || {})
})

app.get("/attack/next", async (c) => {
  // Get start time ONLY of latest future attack
  const response = await fetch("http://worldtimeapi.org/api/timezone/Europe/London")
  const time: Time = await response.json()
  
  const result = await db.query.attacks.findFirst({
    orderBy: desc(schema.attacks.id),
    where: gt(schema.attacks.start, new Date(time.datetime)),
    columns: {
      start: true
    }
  })
  return c.json(result || {})
})

app.get('/time', async (c) => {
  // Get current time as ISO8601 datetime
  const response = await fetch("http://worldtimeapi.org/api/timezone/Europe/London")
  const time: Time = await response.json()

  return c.json({ datetime: time.datetime })
})

export default handle(app)
