import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { AppError } from '../../errors'
import { ILogin } from '../../interfaces/login.interfaces'
import 'dotenv/config'
import { Repository } from 'typeorm'

const loginUserService = async (payload: ILogin): Promise<string> => {
    
    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepository.findOneBy({
        email: payload.email
    })

    if(!user){
        throw new AppError('Invalid credentials', 401)
    }

    const passwordMatch = await compare(payload.password, user.password)
   
    if(!passwordMatch){
        throw new AppError('Invalid credentials', 401)
    }

    const token: string = jwt.sign(
        {
            admin: user.admin,
            email: user.email
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: '24h',
            subject: String(user.id)
        }
    )

    return token
}

export default loginUserService