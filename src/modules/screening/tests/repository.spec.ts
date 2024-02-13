import { test, vi } from 'vitest'
import type { Database } from '@/database'
import { Screening } from '../schema'
import yourFunctions from '../repository'

const mockDb: Partial<Database> = {
  selectFrom: vi.fn().mockReturnThis(),
  selectAll: vi.fn().mockReturnThis(),
  limit: vi.fn().mockReturnThis(),
  offset: vi.fn().mockReturnThis(),
  execute: vi.fn().mockResolvedValue([]), // adjust this as needed
  insertInto: vi.fn().mockReturnValue({
    values: vi.fn().mockReturnThis(),
    execute: vi.fn().mockResolvedValue([]), // adjust this as needed
  }),
}

const { findAll, insertScreen } = yourFunctions(mockDb as Database)

test('findAll function', async () => {
  await findAll()
  expect(mockDb.selectFrom).toHaveBeenCalledWith('screening as s')
  expect(mockDb.selectFrom().innerJoin).toHaveBeenCalledWith(
    'movies as m',
    'm.id',
    's.movie_id'
  )
  expect(mockDb.selectFrom().execute).toHaveBeenCalled()
})

test('insertScreen function', async () => {
  const screening: Screening = {
    movieId: 1,
    time: '2024-02-13 22:10',
    totalTickets: 100,
    takenTickets: 50,
  }
  await insertScreen(screening)
  expect(mockDb.insertInto).toHaveBeenCalledWith('screening')
  expect(mockDb.insertInto().values).toHaveBeenCalledWith({
    movie_id: screening.movieId,
    time: screening.time,
    total_tickets: screening.totalTickets,
    taken_tickets: screening.takenTickets,
  })
  expect(mockDb.insertInto().execute).toHaveBeenCalled()
})
