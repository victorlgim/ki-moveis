import { z } from 'zod'
import { categorySchema, returnCategorySchema, returnMultipleCategorySchema } from '../schemas/categories.schemas'

type ICategory = z.infer<typeof categorySchema>
type ICategoryReturn = z.infer<typeof returnCategorySchema>
type ICategoriesReturn = z.infer<typeof returnMultipleCategorySchema>

export {
    ICategory,
    ICategoryReturn,
    ICategoriesReturn
}