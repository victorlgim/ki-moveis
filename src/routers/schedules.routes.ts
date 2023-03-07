import { Router } from 'express'
import { createSchedulesController, listSchedulesController } from '../controllers/schedules.controllers'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware'
import { ensureNotFoundRealEstatesParams } from '../middlewares/ensureRealEstateExists.middleware'
import ensureIsAdminIdMiddleware from '../middlewares/ensureTokenIsAdminID.middleware'
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middleware'
import { scheduleSchema } from '../schemas/schedules.schemas'

const schedulesRoutes: Router = Router()

schedulesRoutes.post('', ensureTokenIsValidMiddleware, ensureDataIsValidMiddleware(scheduleSchema), createSchedulesController)
schedulesRoutes.get('/realEstate/:id', ensureTokenIsValidMiddleware, ensureIsAdminIdMiddleware, ensureNotFoundRealEstatesParams, listSchedulesController)

export default schedulesRoutes