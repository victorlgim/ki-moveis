import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";

export const ensureMovieExistsMiddleware = async ( req: Request, res: Response, next: NextFunction): Promise<void> => {

  const movieRepository: Repository<User> = AppDataSource.getRepository(User);

  const findMovie = await movieRepository.findOne({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!findMovie) {
    throw new AppError("Movie not found", 404);
  }

  return next();
};

export const checkDuplicateUserEmail = async (req: Request, res: Response, next: NextFunction) => {

    const userEmail: string = req.body.email;
  
    const userRepository = AppDataSource.getRepository(User);
  
    const existingUser = await userRepository.findOne({
      where: {
        email: userEmail
      },
    });
  
    if (userEmail) {
        if (existingUser) {
          throw new AppError(`Email already exists`, 409);
        }
    }
  
    next();
  };
  
  
  
  
  
  

