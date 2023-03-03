import { Router } from 'express'
import { createUserController } from '../controllers/users.controllers'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware'
import { checkDuplicateUserEmail } from '../middlewares/ensureUserExists.middleware'
import { userSchema } from '../schemas/users.schemas'


const userRoutes: Router = Router()

userRoutes.post('', checkDuplicateUserEmail, ensureDataIsValidMiddleware(userSchema), createUserController)


export default userRoutes