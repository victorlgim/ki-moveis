import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Category } from "../../entities"
import { ICategoriesReturn } from "../../interfaces/categories.interfaces"
import { returnMultipleCategorySchema } from "../../schemas/categories.schemas"

const listCategoryService = async (): Promise<ICategoriesReturn> => {

    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const findCategory: Array<Category> = await categoryRepository.find()

    const categories = returnMultipleCategorySchema.parse(findCategory)
   
    return categories
}

export {
    listCategoryService
}