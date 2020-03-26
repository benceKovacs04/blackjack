import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'secure_password',
    database: 'Blackjack',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}