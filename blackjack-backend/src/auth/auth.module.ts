import { Module } from "@nestjs/common";
import { UsersModule } from '../users/users.module'
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../constants/constants";
import { JwtStrategy } from "./jwt.strategy";

@Module(
    {
        providers: [
            { provide: 'IAuthService', useClass: AuthService },
            JwtStrategy
        ],
        imports: [
            UsersModule,
            JwtModule.register({
                secret: jwtConstants.secret
            })
        ],
        controllers: [AuthController]
    }
)

export class AuthModule { }