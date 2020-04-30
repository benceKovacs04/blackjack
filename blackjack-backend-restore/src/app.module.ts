import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrmConfig';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GameModule } from './game/game.module';
import { JwtCookieToHeader } from './middlewares/jwtCookieToHeader.middleware';
import { AuthController } from './auth/auth.controller';

@Module({
    imports: [
        TypeOrmModule.forRoot(
            typeOrmConfig,
        ),
        AuthModule,
        UsersModule,
        GameModule
    ],

})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JwtCookieToHeader).forRoutes(AuthController)
    }
}
