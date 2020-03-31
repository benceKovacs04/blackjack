import { Injectable, HttpException, HttpStatus, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "../users/users.repository";
import { User } from "../users/users.entity";
import { IAuthService } from './IAuthService'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly userRepository: UsersRepository,
        private readonly jwtService: JwtService
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

    async signIn(username: string, password: string) {

        const bcrypt = require('bcrypt')

        const user: User = await this.userRepository.findOne({ username: username })
        if (user) {
            const match = await bcrypt.compare(password, user.password)
            if (match) {
                const payLoad = { username: username, sub: user.id }
                return this.jwtService.sign(payLoad);
            }
            else {
                throw new BadRequestException("Username or password is wrong")
            }
        }
        else {
            throw new BadRequestException("Username or password is wrong")
        }

    }
}