import type { Database } from '@/database'
import { Screening } from './schema'

export default (db: Database) => ({
  findAll: async () => {
    const screenings = await db
      .selectFrom('screening as s')
      .innerJoin('movies as m', 'm.id', 's.movie_id')
      .select([
        's.time',
        's.total_tickets',
        's.taken_tickets',
        'm.title',
        'm.year',
      ])
      .execute()

    return screenings
  },

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
