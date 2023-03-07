import { Router } from 'express'
import { createRealEstateController, listRealEstateController } from '../controllers/realEstate.controllers'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware'
import { checkDuplicateAddress } from '../middlewares/ensureRealEstateExists.middleware'
import ensureIsAdminIdMiddleware from '../middlewares/ensureTokenIsAdminID.middleware'
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middleware'
import { realEstateSchema } from '../schemas/realEstate.schemas'

const realEstateRoutes: Router = Router()

realEstateRoutes.post('', ensureTokenIsValidMiddleware, ensureIsAdminIdMiddleware, ensureDataIsValidMiddleware(realEstateSchema), checkDuplicateAddress, createRealEstateController)
realEstateRoutes.get('', listRealEstateController)

export default realEstateRoutes