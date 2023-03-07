import { Request, Response } from "express";
import { IRealEstatePayload } from "../interfaces/realEstate.interfaces";
import { createRealEstateService } from "../services/realEstate/createRealEstate.service";
import { listRealEstateService } from "../services/realEstate/listRealEstates.service";

const createRealEstateController = async ( req: Request, res: Response): Promise<Response> => {
  const { value, size, address, categoryId }: IRealEstatePayload = req.body;

  const realEstate = await createRealEstateService({
    value,
    size,
    address,
    categoryId,
  });

  return res.status(201).json(realEstate);
};

const listRealEstateController = async (req: Request, res: Response) => {
  const realEstate = await listRealEstateService();

  return res.json(realEstate);
};

export { createRealEstateController, listRealEstateController };
