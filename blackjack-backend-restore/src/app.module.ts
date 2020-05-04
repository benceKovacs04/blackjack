import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrmConfig';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtCookieToHeader } from './middlewares/jwtCookieToHeader.middleware';
import { AuthController } from './auth/auth.controller';
import { GameManagerModule } from './GameManager/gamemanager.module';
import { GameManagerController } from './GameManager/gamemanager.controller';
import { GameModule } from './GameManager/game/game.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(
            typeOrmConfig,
        ),
        AuthModule,
        UsersModule,
        GameManagerModule,
        GameModule
    ],

})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JwtCookieToHeader).forRoutes(AuthController, GameManagerController)
    }
}
