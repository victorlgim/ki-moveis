import { Router } from 'express'
import { createCategoriesController, listCategoriesController } from '../controllers/categories.controllers'
import { checkDuplicateCategoryName } from '../middlewares/ensureCategoryExists.middleware'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware'
import ensureIsAdminIdMiddleware from '../middlewares/ensureTokenIsAdminID.middleware'
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middleware'
import { categorySchema } from '../schemas/categories.schemas'

const categoriesRoutes: Router = Router()

categoriesRoutes.post('', ensureTokenIsValidMiddleware, ensureIsAdminIdMiddleware, ensureDataIsValidMiddleware(categorySchema), checkDuplicateCategoryName, createCategoriesController)
categoriesRoutes.get('', listCategoriesController)

export default categoriesRoutes