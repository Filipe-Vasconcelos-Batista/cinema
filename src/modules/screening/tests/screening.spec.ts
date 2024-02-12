import supertest from 'supertest'
import createApp from '@/app'
import { Screening } from '../schema'
import { Database } from '@/database'
import buildRespository from '../repository'
// Mock the database and the repository
const mockDb: Partial<Database> = {}
const mockRepo = buildRespository(mockDb as Database)

// Mock the insertScreen method
mockRepo.insertScreen = vi.fn().mockResolvedValue({})

const app = createApp(mockDb as Database)

describe('POST /screening', () => {
  it('should insert a new screening and return a success message', async () => {
    const newScreening: Screening = {
      movieId: 133093,
      time: '2022-12-31T22:30',
      totalTickets: 30,
      takenTickets: 0,
    }

    const response = await supertest(app)
      .post('/screening')
      .send(newScreening)
      .expect(200)

    expect(response.body).toEqual({
      message: `Screening insert successfully ${JSON.stringify(newScreening)}`,
    })

    expect(mockRepo.insertScreen).toHaveBeenCalledWith(newScreening)
  })
})
