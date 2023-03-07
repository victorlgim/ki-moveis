import { z } from 'zod';
import { addressSchema } from '../schemas/realEstate.schemas';

type IAddress = z.infer<typeof addressSchema>

export {
    IAddress
}