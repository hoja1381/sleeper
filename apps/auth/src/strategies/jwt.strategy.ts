import { SERVICE } from "@app/common";
import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { IUserService } from "../users/users.service";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(SERVICE) private readonly userService: IUserService,
        private configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request?.cookies?.authentication
            ]),
            secretOrKey: configService.get<string>('JWT_SEC')
        })
    }

    async validate({ userId }: JwtPayload) {
        return await this.userService.findOne(userId)
    }
}