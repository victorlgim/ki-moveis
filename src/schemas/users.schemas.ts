import { z } from 'zod'

const userSchema = z.object({
    name: z.string().min(3).max(45),
    email: z.string().email().max(45),
    password: z.string().min(4).max(20),
    admin: z.boolean().default(false)
})

const userUpdateSchema = userSchema.partial()

const returnUserSchema = userSchema.extend({
    id: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
}).omit({password: true})

export {
    userSchema,
    userUpdateSchema,
    returnUserSchema
}