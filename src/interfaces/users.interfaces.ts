import { userSchema, userUpdateSchema, returnUserSchema } from '../schemas/users.schemas'
import { z } from 'zod'
import { DeepPartial } from 'typeorm'

type IUser = z.infer<typeof userSchema>
type IUserReturn = z.infer<typeof returnUserSchema>
type IUserUpdate = DeepPartial<IUser>


export {
    IUser,
    IUserUpdate,
    IUserReturn
}