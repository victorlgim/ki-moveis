import { Request, Response } from "express";
import createScheduleService from "../services/schedules/createSchedules.service";
import { listRealEstateSchedulesService } from "../services/schedules/listSchedules.service";

const createSchedulesController = async (req: Request, res: Response): Promise<Response> => {
  const data = req.body;

  const id = req.user.id

  await createScheduleService(id, data);

  return res.status(201).json({message: "Schedule created"});
};

const listSchedulesController = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)

    const schedules = await listRealEstateSchedulesService(id);
  
    return res.json(schedules);
  };

export {
    createSchedulesController,
    listSchedulesController
}