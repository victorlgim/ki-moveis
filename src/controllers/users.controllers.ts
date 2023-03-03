import { Request, Response } from "express";
import { IUser } from "../interfaces/users.interfaces";
import createUserService from "../services/users/createUsers.service";
import deleteUserService from "../services/users/deleteUsers.service";
import { listUsersService } from "../services/users/listUsers.service";
import updateUserService from "../services/users/updateUsers.service";

const createUserController = async (req: Request, res: Response) => {
  const { name, email, password, admin }: IUser = req.body;

  const newUser = await createUserService({ name, email, password, admin });

  return res.status(201).json(newUser);
};

const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();

  return res.json(users);
};

const updateProfileController = async ( req: Request, res: Response): Promise<Response> => {
  const id: number = parseInt(req.params.id);

  const body = req.body;

  const newUpdate = await updateUserService(body, id);

  return res.json(newUpdate);
};

const deleteProfileController = async ( req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);

  const users = await deleteUserService(id);

  return res.status(204).json(users);
};

export {
  createUserController,
  updateProfileController,
  deleteProfileController,
  listUsersController,
};
