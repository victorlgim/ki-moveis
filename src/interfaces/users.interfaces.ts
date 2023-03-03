import { userSchema, userUpdateSchema, returnUserSchema, updateUserSchema, returnMultipleUserSchema } from '../schemas/users.schemas'
import { z } from 'zod'
import { DeepPartial } from 'typeorm'

type IUser = z.infer<typeof userSchema>
type IUserReturn = z.infer<typeof returnUserSchema>
type IUserUpdate = DeepPartial<IUser>
type IUpdateRequest = z.infer<typeof updateUserSchema>
type IUsersReturn = z.infer<typeof returnMultipleUserSchema>

export {
    IUser,
    IUserUpdate,
    IUserReturn,
    IUpdateRequest,
    IUsersReturn
}