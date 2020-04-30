import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from '../auth/jwt-auth.guard'


@Controller("gameManager")
export class GameManagerController {
    @UseGuards(JwtAuthGuard)
    @Get("test")
    test() {
        return "string"
    }

}