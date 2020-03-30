import { Module } from "@nestjs/common";
import { UsersModule } from '../users/users.module'
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module(
    {
        providers: [
            { provide: 'IAuthService', useClass: AuthService }
        ],
        imports: [UsersModule],
        controllers: [AuthController]
    }
)

export class AuthModule { }