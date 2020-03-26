import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./auth.repository";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module(
    {
        providers: [AuthService],
        imports: [TypeOrmModule.forFeature([UserRepository])],
        controllers: [AuthController]
    }
)

export class AuthModule { }