import { Module } from "@nestjs/common";
import { UsersModule } from '../users/users.module'
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersRepository } from "../users/users.repository";

@Module(
    {
        providers: [AuthService],
        imports: [TypeOrmModule.forFeature([UsersRepository])],
        controllers: [AuthController]
    }
)

export class AuthModule { }