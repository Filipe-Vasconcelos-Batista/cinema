import { Router } from 'express'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRespository from './repository'

export default (db: Database) => {
  const messages = buildRespository(db)
  const router = Router()

  router.get(
    '/',
    jsonRoute(async (req) => {
      const idsParam = req.query.id as string
      const idsArray = idsParam ? idsParam.split(',').map(Number) : []
      const movies = await messages.findByIds(idsArray)

      return movies
    })
  )

  return router
}
