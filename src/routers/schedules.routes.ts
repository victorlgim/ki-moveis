import { Router } from 'express'
import { createSchedulesController } from '../controllers/schedules.controllers'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware'
import { ensureNotFoundRealEstates } from '../middlewares/ensureRealEstateExists.middleware'
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middleware'
import { scheduleSchema } from '../schemas/schedules.schemas'



const schedulesRoutes: Router = Router()

schedulesRoutes.post('', ensureTokenIsValidMiddleware, ensureDataIsValidMiddleware(scheduleSchema), createSchedulesController)

export default schedulesRoutes