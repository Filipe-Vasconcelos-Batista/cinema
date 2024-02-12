import type { Database } from '@/database'
import { Screening } from './schema'

export default (db: Database) => ({
  findAll: async (limit = 10, offset = 0) =>
    db
      .selectFrom('screening')
      .selectAll()
      .limit(limit)
      .offset(offset)
      .execute(),

  insertScreen: async (screening: Screening) =>
    db
      .insertInto('screening')
      .values({
        movie_id: screening.movieId,
        time: screening.time,
        total_tickets: screening.totalTickets,
        taken_tickets: screening.takenTickets,
      })
      .execute(),
})
