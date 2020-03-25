import { Module } from "@nestjs/common";
import { UserAuthController } from "./UserAuth.controller";

@Module(
    {
        imports: [],
        controllers: [UserAuthController],
        providers: []
    }
)

export class UserAuthModule { }