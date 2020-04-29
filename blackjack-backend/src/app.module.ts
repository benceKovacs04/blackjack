import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrmConfig';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GameModule } from './game/game.module';

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
export class AppModule { }
