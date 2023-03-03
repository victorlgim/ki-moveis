import { ICategory, ICategoryReturn } from '../../interfaces/categories.interfaces'
import { AppDataSource } from '../../data-source'
import { Category } from '../../entities'
import { Repository } from 'typeorm'
import { returnCategorySchema } from '../../schemas/categories.schemas'



const createCategoriesService = async (payload: ICategory): Promise<ICategoryReturn> => {

    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const category: Category = categoryRepository.create(payload)

    await categoryRepository.save(category)
    
    const newCategory = returnCategorySchema.parse(category)
    
    return newCategory 

}

export default createCategoriesService