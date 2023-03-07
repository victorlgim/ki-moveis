import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Category, RealEstate } from "../../entities"
import { ICategoriesReturn } from "../../interfaces/categories.interfaces"
import { returnMultipleCategorySchema } from "../../schemas/categories.schemas"
import { expectedResponseSchema, returnMultipleRealEstateSchema } from "../../schemas/realEstate.schemas"


const listCategoryService = async (): Promise<ICategoriesReturn> => {

    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const findCategory: Array<Category> = await categoryRepository.find()

    const categories = returnMultipleCategorySchema.parse(findCategory)
   
    return categories
}

const listCategoryIdService = async (idCategory: number): Promise<any> => {
  const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

  const categoryRepository = AppDataSource.getRepository(Category);
  
    const existingCategory = await categoryRepository.findOne({
      where: {
        id: idCategory
      },
    });
     
  const findRealEstate = await realEstateRepository.find({ 
    where: {
      category: { 
        id: idCategory 
    }
    },
    relations: {
      address: true
    }
  })
  
  const parsedRealEstateList = expectedResponseSchema.parse({
    id: existingCategory?.id,
    name: existingCategory?.name,
    realEstate: findRealEstate,
  });

  return parsedRealEstateList;
}


export {
    listCategoryService,
    listCategoryIdService
}