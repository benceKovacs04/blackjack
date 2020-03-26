import { Injectable, HttpException, HttpStatus, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./auth.repository";
import { User } from "./user.entity";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) { }

    async signUp(username: string, password: string) {

        let user: User = await this.userRepository.findOne({ username: username })
        if (user) {
            throw new BadRequestException("User already exists")
        }

        const bcrypt = require('bcrypt')
        const saltRounds = 10;

        user = new User();
        user.username = username;
        user.password = bcrypt.hashSync(password, saltRounds)

        this.userRepository.save(user);
    }
}