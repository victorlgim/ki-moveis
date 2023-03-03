import { z } from 'zod'

const userSchema = z.object({
    name: z.string().min(3).max(45),
    email: z.string().email().max(45),
    password: z.string().min(4).max(20),
    admin: z.boolean().default(false)
})

export const updateUserSchema = z.object({
    name: z.string().min(3).max(45).optional(),
    email: z.string().email().optional()
})

const userUpdateSchema = userSchema.partial()

const returnUserUpdateSchema = userUpdateSchema.extend({
    id: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
}).omit({password: true})

const returnUserSchema = userSchema.extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
}).omit({password: true})

const returnMultipleUserSchema = returnUserSchema.array()

export {
    userSchema,
    userUpdateSchema,
    returnUserSchema,
    returnUserUpdateSchema,
    returnMultipleUserSchema
}