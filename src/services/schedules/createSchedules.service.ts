import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { Schedule, User, RealEstate } from '../../entities'
import { AppError } from '../../errors';
import { iCreateSchedule } from '../../interfaces/schedules.interfaces';

const createScheduleService = async (userId: number, scheduleData: iCreateSchedule): Promise<Schedule> => {

  const userRepository: Repository<User> = AppDataSource.getRepository(User)
  const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
  const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule)

  const user: User | null = await userRepository.findOne({
    where: {
        id: userId
    }
  })

  if (!user) {
    throw new AppError('User not found', 404)
  }

  const realEstate: RealEstate | null = await realEstateRepository.findOne({
    where: {
        id: scheduleData.realEstateId
    }
  })

  if (!realEstate) {
    throw new AppError('RealEstate not found', 404)
  }

  const existingSchedule = await scheduleRepository
    .createQueryBuilder('schedule')
    .where('schedule.date = :date', { 
      date: scheduleData.date 
    })
    .andWhere('schedule.hour = :hour', { 
      hour: scheduleData.hour 
    })
    .andWhere('schedule.realEstateId = :realEstateId', { 
      realEstateId: scheduleData.realEstateId 
    })
    .getOne();

    const existingUserSchedule = await scheduleRepository
    .createQueryBuilder('schedule')
    .where('schedule.date = :date', { 
      date: scheduleData.date 
    })
    .andWhere('schedule.hour = :hour', { 
      hour: scheduleData.hour 
    })
    .andWhere('schedule.userId = :userId', { 
      userId 
    })
    .getOne();

  
  if (existingSchedule) {
    throw new AppError('Schedule to this real estate at this date and time already exists', 409)
  }
  
  if (existingUserSchedule) {
    throw new AppError('User schedule to this real estate at this date and time already exists', 409)
  }

  const hour = parseInt(scheduleData.hour.split(':')[0])

  if (hour < 8 || hour >= 18) {
    throw new AppError('Invalid hour, available times are 8AM to 18PM', 400)
  }

  const dayOfWeek = (new Date(scheduleData.date)).getDay()
  
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    throw new AppError('Invalid date, work days are monday to friday', 400)
  }
  
  const schedule = scheduleRepository.create({
    date: scheduleData.date,
    hour: scheduleData.hour,
    realEstate,
    user
  })

  await scheduleRepository.save(schedule)

  return schedule
}

export default createScheduleService