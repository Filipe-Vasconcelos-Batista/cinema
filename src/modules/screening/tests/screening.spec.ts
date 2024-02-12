import supertest from 'supertest'
import { vi } from 'vitest'
import createDatabase from '@/database'
import createApp from '@/app'

// Testing with a real database, fine for read-only tests, as we would not
// want to pollute the database with test data, as then we need to clean it up.
// To make sure we are not modifying anything in a real database, we are using
// a read-only connection.
const db = createDatabase(process.env.DATABASE_URL as string, {
  readonly: true,
})

// Mock the insert method on the actual db object
db.insert = vi
  .fn()
  .mockResolvedValue({ id: 1, movieId: 133093, time: '31122025T2230' })

// We could also easily use an in-memory database here, but then we would need
// to provide some test data
// const db = await createTestDatabase()

const app = createApp(db)

describe('POST /screenings', () => {
  it('should create a new screening with the data we feed it', async () => {
    const newScreening = { movieId: 133093, time: '31122025T2230' }

    // Act
    const { body } = await supertest(app)
      .post('/screenings')
      .send(newScreening)
      .expect(201)

    // Assert
    expect(db.insert).toHaveBeenCalledWith(newScreening) // Check that insert was called correctly
    expect(body).toEqual({ id: 1, ...newScreening })
  })
})
