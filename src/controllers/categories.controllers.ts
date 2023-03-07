import { Request, Response } from "express";
import { ICategory } from "../interfaces/categories.interfaces";
import createCategoriesService from "../services/categories/createCategories.service";
import { listCategoryIdService, listCategoryService } from "../services/categories/listCategories.service";


const createCategoriesController = async (req: Request, res: Response): Promise<Response> => {
  const data: ICategory = req.body;

  const categories = await createCategoriesService(data);

  return res.status(201).json(categories);
};

const listCategoriesController = async (req: Request, res: Response) => {
    const categories = await listCategoryService();
  
    return res.json(categories);
  };

const listCategoryIdController = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const categories = await listCategoryIdService(id)

    return res.json(categories)
}

export { 
    createCategoriesController, 
    listCategoriesController,
    listCategoryIdController
};
