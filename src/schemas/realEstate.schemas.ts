import { z } from 'zod';
import { categorySchema } from './categories.schemas';

  const addressSchema = z.object({
    street: z.string().max(45),
    zipCode: z.string().max(8),
    number: z.string().max(7).nullish(),
    city: z.string().max(20),
    state: z.string().max(2),
  });

  const schemaValue = z.union([z.string(), z.number()])
  
  const returnAddressSchema = addressSchema.extend({
    id: z.number(),
  }) 
  
const realEstateSchema = z.object({
  value: schemaValue, 
  categoryId: z.number(),
  size: z.number().positive({message: "Number must be greater than 0"}),
  address: addressSchema
});

const createRealEstateSchema = realEstateSchema.extend({
  address: addressSchema.optional(),
});
  
  const returnRealEstateSchema = realEstateSchema
  .omit({address: true, categoryId: true})
  .extend({
    sold: z.boolean().default(false),
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    address: returnAddressSchema,
  });

  const expectedResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    realEstate: z.array(
      z.object({
        createdAt: z.string(),
        id: z.number(),
        size: z.number(),
        sold: z.boolean(),
        updatedAt: z.string(),
        value: schemaValue,
      }),
    ),
  });
  
  const returnMultipleRealEstateSchema = returnRealEstateSchema.array();
  
  export {
    realEstateSchema,
    returnRealEstateSchema,
    returnMultipleRealEstateSchema,
    createRealEstateSchema,
    addressSchema,
    expectedResponseSchema
  };