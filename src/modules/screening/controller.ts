import { Router } from 'express'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRespository from './repository'
import { Screening } from './schema'

export default (db: Database) => {
  const messages = buildRespository(db)
  const router = Router()
  router.get(
    '/',
    jsonRoute(async (req, res) => {
      const screenings = await messages.findAll()
      res.json(screenings)
    })
  )

  router.post(
    '/',
    jsonRoute(async (req) => {
      const screening: Screening = req.body
      await messages.insertScreen(screening)

      return {
        message: `Screening insert successfully ${JSON.stringify(screening)}`,
      }
    })
  )

  return router
}
