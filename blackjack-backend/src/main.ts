import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const whitelist = ["http://localhost:3000"]
    const corsOptions = {
        credentials: true,
        origin: (origin, callback) => {
            if (whitelist.includes(origin)) {
                return callback(null, true)
            }
            callback(new Error("Not allowed by CORS"))
        }
    }
    app.enableCors(corsOptions);
    await app.listen(5000);
}
bootstrap();
