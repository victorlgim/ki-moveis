import { IRealEstate, IReturnRealEstate, IRealEstatePayload } from '../../interfaces/realEstate.interfaces'  
import { AppDataSource } from '../../data-source'
import { Address, Category, RealEstate } from '../../entities'
import { Repository } from 'typeorm'
import { createRealEstateSchema, realEstateSchema, returnRealEstateSchema } from '../../schemas/realEstate.schemas'
import { AppError } from '../../errors'
import { DeepPartial } from 'typeorm'

const createRealEstateService = async (payload: any): Promise<any> => {
  const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
  const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);
  const addressRepository: Repository<Address> = AppDataSource.getRepository(Address);

  const category: Category | null = await categoryRepository.findOne({
    where: { 
      id: payload.categoryId 
  },
 });

  if (!category) {
    throw new AppError('Category not found', 404);
  }

   const { address } = payload
   const { number } = address

 const findAddress = await addressRepository.findOneBy({
   ...address, 
   number: number ? number : ''
 })

  if (findAddress) {
    throw new AppError('Address already exists', 409)
  }

 const newAddress = addressRepository.create(address);

  await addressRepository.save(newAddress);

  const realEstate = realEstateRepository.create({
    ...payload,
    address: newAddress,
    category
  });
  
    await realEstateRepository.save(realEstate);
      
    return realEstate
  };

export {
  createRealEstateService
}