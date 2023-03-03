import { Request, Response } from 'express'
import { IUser } from '../interfaces/users.interfaces'
import createUserService from '../services/users/createUsers.service'


const createUserController = async (req: Request, res: Response) => {

    const {name, email, password, admin }: IUser = req.body

    const newUser = await createUserService({ name, email, password, admin })

    return res.status(201).json(newUser)

}

export {
    createUserController
}