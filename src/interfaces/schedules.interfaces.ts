import { z } from 'zod';
import { returnScheduleSchema, scheduleSchema } from '../schemas/schedules.schemas';

type iCreateSchedule = z.infer<typeof scheduleSchema>
type iReturnSchedule = z.infer<typeof returnScheduleSchema>

export {
   iCreateSchedule,
   iReturnSchedule
}