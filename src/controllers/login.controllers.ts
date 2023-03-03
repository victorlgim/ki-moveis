import { Request, Response } from 'express'
import { ILogin } from '../interfaces/login.interfaces'
import loginUserService from '../services/login/loginUsers.service'

const loginUserController = async (req: Request, res: Response): Promise<Response> => {

    const login: ILogin = req.body

    const token = await loginUserService(login)

    return res.status(200).json({
        token: token
    })

}

export {
    loginUserController
}