import { Router } from 'express'
import { createUserController, deleteProfileController, listUsersController, updateProfileController } from '../controllers/users.controllers'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware'
import ensureIsAdminMiddleware from '../middlewares/ensureTokenIsAdmin.middleware'
import ensureIsAdminIdMiddleware from '../middlewares/ensureTokenIsAdminID.middleware'
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middleware'
import { checkDuplicateUserEmail, checkDuplicateUserName, ensureUsersExistsMiddleware } from '../middlewares/ensureUserExists.middleware'
import { updateUserSchema, userSchema } from '../schemas/users.schemas'

const userRoutes: Router = Router()

userRoutes.get('', ensureTokenIsValidMiddleware, ensureIsAdminIdMiddleware, listUsersController)
userRoutes.post('', checkDuplicateUserEmail, ensureDataIsValidMiddleware(userSchema), createUserController)
userRoutes.patch('/:id', ensureTokenIsValidMiddleware, ensureUsersExistsMiddleware, ensureIsAdminMiddleware, checkDuplicateUserEmail, ensureDataIsValidMiddleware(updateUserSchema), updateProfileController)
userRoutes.delete('/:id', ensureUsersExistsMiddleware, ensureTokenIsValidMiddleware, ensureIsAdminIdMiddleware, deleteProfileController)


export default userRoutes