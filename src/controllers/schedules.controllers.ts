import { Request, Response } from "express";
import { ICategory } from "../interfaces/categories.interfaces";
import createCategoriesService from "../services/categories/createCategories.service";
import { listCategoryIdService, listCategoryService } from "../services/categories/listCategories.service";
import createScheduleService from "../services/schedules/createSchedules.service";


const createSchedulesController = async (req: Request, res: Response): Promise<Response> => {
  const data = req.body;
  const id = req.user.id

  await createScheduleService(id, data);

  return res.status(201).json({message: "Schedule created"});
};

export {
    createSchedulesController
}