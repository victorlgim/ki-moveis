import { z } from 'zod';
import { realEstateSchema, returnRealEstateSchema, returnMultipleRealEstateSchema } from '../schemas/realEstate.schemas';

type IRealEstate = z.infer<typeof realEstateSchema>
type IReturnRealEstate = z.infer<typeof returnRealEstateSchema>
type IRealEstateReturnAll = z.infer<typeof returnMultipleRealEstateSchema>

interface IRealEstatePayload {
    value: string | number;
    size: number;
    address: {
      street: string;
      number?: string;
      zipCode: string;
      city: string;
      state: string;
    };
    categoryId: number;
}

export {
    IRealEstate,
    IReturnRealEstate,
    IRealEstatePayload,
    IRealEstateReturnAll
}