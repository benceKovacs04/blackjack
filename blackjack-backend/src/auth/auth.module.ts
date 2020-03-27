import { Module } from "@nestjs/common";
import { UsersModule } from '../users/users.module'
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersRepository } from "../users/users.repository";

@Module(
    {
        providers: [AuthService],
        imports: [UsersModule],
        controllers: [AuthController]
    }
)

export class AuthModule { }