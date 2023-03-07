import { z } from 'zod'
import { returnUserSchema } from './users.schemas'

const scheduleSchema = z.object({
    date: z.string(),
    hour: z.string(),
    realEstateId: z.number()
})

const returnScheduleSchema = scheduleSchema.extend({
    id: z.number(),
    user: returnUserSchema
})

export {
    scheduleSchema,
    returnScheduleSchema
}