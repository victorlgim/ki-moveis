import 'dotenv/config'
import 'reflect-metadata'
import { DataSource, DataSourceOptions } from 'typeorm'
import { Address, Category, RealEstate, Schedule, User } from './entities'
import { createUsers1677703485342 } from './migrations/1677703485342-createUsers'

const dataSourceConfig = (): DataSourceOptions => {

    const dbUrl: string | undefined = process.env.DATABASE_URL

    if(!dbUrl){
        throw new Error('Env var DATABASE_URL does not exists')
    }

    const nodeEnv: string | undefined = process.env.NODE_ENV

    if(nodeEnv === 'test'){
        return {
            type: 'sqlite',
            database: ':memory:',
            synchronize: true,
            entities: [User, Schedule, RealEstate, Address, Category]
        }
    }
    
    return {
        type: 'postgres',
        url: dbUrl,
        synchronize: false,
        logging: true,
        migrations: [createUsers1677703485342],
        entities: [User, Schedule, RealEstate, Address, Category]
    }
}

const AppDataSource = new DataSource(dataSourceConfig())

export {
    AppDataSource
}