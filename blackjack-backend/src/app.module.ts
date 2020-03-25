import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserAuthModule } from './UserAuth/UserAuth.module';

@Module({
    imports: [UserAuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
