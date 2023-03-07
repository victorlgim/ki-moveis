import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Address, RealEstate} from "../entities";
import { AppError } from "../errors";

  
export const checkDuplicateAddress = async (req: Request, res: Response, next: NextFunction) => {

    const realEstateAddress = req.body.address;
  
    const realEstateRepository = AppDataSource.getRepository(Address);
  
    const existingAddress = await realEstateRepository.findOne({
      where: {
          street: realEstateAddress?.street,
          zipCode: realEstateAddress?.zipCode,
        
      },
    });
  
    if (existingAddress) {
      throw new AppError(`Address already exists`, 409);
    }
  
    next();
  };

  export const ensureNotFoundRealEstates = async (req: Request, res: Response, next: NextFunction) => {

    const realEstate = req.body.realEstateId;
  
    const realEstateRepository = AppDataSource.getRepository(RealEstate);
  
    const existingRealEstate = await realEstateRepository.findOne({
      where: {
          id: realEstate
      },
    });
  
    if(realEstate) {
      if (existingRealEstate) {
        throw new AppError(`RealEstate not found`, 404);
      }
    }
   
  
    next();
  };
  