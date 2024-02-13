import request from 'supertest'
import express from 'express'
import { vi } from 'vitest'
import type { Kysely } from 'kysely'
import type { Database } from '@/database'
import yourRouter from '../controller'

describe('Screening tests', () => {
  const mockDb: Kysely<any> = {
    insertInto: vi.fn().mockReturnThis(),
    values: vi.fn().mockReturnThis(),
    execute: vi.fn().mockReturnThis(),
  }

  const app = express()
  app.use(express.json())
  app.use('/', yourRouter(mockDb))

  it('POST /', async () => {
    const screening = {
      movieId: 1,
      time: '2024-02-13T05:10:47.851Z',
      totalTickets: 100,
      takenTickets: 50,
    }

    const res = await request(app).post('/').send(screening)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('message')
    expect(mockDb.insertInto).toHaveBeenCalledWith('screening')
    expect(mockDb.values).toHaveBeenCalledWith({
      movie_id: screening.movieId,
      time: screening.time,
      total_tickets: screening.totalTickets,
      taken_tickets: screening.takenTickets,
    })
    expect(mockDb.execute).toHaveBeenCalled()
  })
})
