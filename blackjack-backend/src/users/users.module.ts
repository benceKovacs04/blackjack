import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersRepository } from './users.repository'

@Module(
    {
        providers: [UsersRepository],
        imports: [TypeOrmModule.forFeature(
            [UsersRepository]
        )],
        exports: [TypeOrmModule],
        controllers: []
    }
)

export class UsersModule { }