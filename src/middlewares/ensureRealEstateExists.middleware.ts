import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Address, RealEstate} from "../entities";
import { AppError } from "../errors";

const checkDuplicateAddress = async (req: Request, res: Response, next: NextFunction) => {

    const realEstateAddress = req.body.address;
  
    const realEstateRepository = AppDataSource.getRepository(Address);
  
    const existingAddress = await realEstateRepository.findOne({
      where: {
          street: realEstateAddress?.street,
          zipCode: realEstateAddress?.zipCode 
      },
    });
  
    if (existingAddress) {
      throw new AppError(`Address already exists`, 409);
    }
  
    next();
  };

 const ensureNotFoundRealEstates = async (req: Request, res: Response, next: NextFunction) => {

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
  
const ensureNotFoundRealEstatesParams = async (req: Request, res: Response, next: NextFunction) => {

    const realEstate = parseInt(req.params.id);
  
    const realEstateRepository = AppDataSource.getRepository(RealEstate);
  
    const existingRealEstate = await realEstateRepository.findOne({
      where: {
          id: realEstate
      },
    });
  
    if(realEstate) {
      if (!existingRealEstate) {
        throw new AppError(`RealEstate not found`, 404);
      }
    }
   
    next();
  };

  export {
    checkDuplicateAddress,
    ensureNotFoundRealEstates,
    ensureNotFoundRealEstatesParams
  }