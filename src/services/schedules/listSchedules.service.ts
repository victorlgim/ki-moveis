import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { RealEstate } from "../../entities"

const listRealEstateSchedulesService = async (realEstateId: number): Promise<any> => {
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

    const realEstate = await realEstateRepository
        .createQueryBuilder('realEstate')
        .innerJoinAndSelect('realEstate.address', 'address')
        .innerJoinAndSelect('realEstate.category', 'category')
        .leftJoinAndSelect('realEstate.schedules', 'schedule')
        .leftJoinAndSelect('schedule.user', 'user')
        .where('realEstate.id = :realEstateId', { realEstateId })
        .orderBy('schedule.date', 'ASC')
        .addOrderBy('schedule.hour', 'ASC')
        .getOne();

    return realEstate;
};

export {
    listRealEstateSchedulesService
}




