import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { RealEstate } from "../../entities"
import { IRealEstateReturnAll } from "../../interfaces/realEstate.interfaces"
import { returnMultipleRealEstateSchema } from "../../schemas/realEstate.schemas"

const listRealEstateService = async (): Promise<IRealEstateReturnAll> => {

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const findRealEstate: Array<RealEstate> = await realEstateRepository.find({ 
        relations: {
            address: true
        }
     })
  
    const realEstate = returnMultipleRealEstateSchema.parse(findRealEstate)
   
    return realEstate
}

export {
    listRealEstateService
}