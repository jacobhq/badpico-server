import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import * as schema from '../db/schema';
import { desc, gt, lt } from 'drizzle-orm';

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

app.get('/', async (c) => {
  // Get latest attack where start time is in past
  const response = await fetch("http://worldtimeapi.org/api/timezone/Europe/London")
  const time: Time = await response.json()
  
  const result = await db.query.attack_schedule.findFirst({
    orderBy: desc(schema.attack_schedule.id),
    where: lt(schema.attack_schedule.start, new Date(time.datetime))
  })
  return c.json(result)
})

app.get("/next", async (c) => {
  // Get start time ONLY of latest future attack
  const response = await fetch("http://worldtimeapi.org/api/timezone/Europe/London")
  const time: Time = await response.json()
  
  const result = await db.query.attack_schedule.findFirst({
    orderBy: desc(schema.attack_schedule.id),
    where: gt(schema.attack_schedule.start, new Date(time.datetime)),
    columns: {
      start: true
    }
  })
  return c.json(result)
})

app.get('/time', async (c) => {
  // Get current time as ISO8601 datetime
  const response = await fetch("http://worldtimeapi.org/api/timezone/Europe/London")
  const time: Time = await response.json()

  return c.json({ datetime: time.datetime })
})

export default handle(app)
