import { SERVICE } from "@app/common";
import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { IUserService } from "../users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(SERVICE) private readonly userService: IUserService) {
        super({ usernameField: 'email' })
    }

    async validate(email: string, password: string) {
        return await this.userService.verifyUser(email, password)
    }
}