import { Injectable, HttpException, HttpStatus, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "../users/users.repository";
import { User } from "../users/users.entity";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private userRepository: UsersRepository
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