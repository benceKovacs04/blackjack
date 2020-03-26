import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./auth.repository";
import { User } from "./user.entity";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) { }

    signUp(username: string, password: string) {
        const user = new User()
        user.name = username;
        user.password = password;

        this.userRepository.save(user);
    }
}