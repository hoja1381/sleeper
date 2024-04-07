import { Inject } from '@nestjs/common';
import { User } from './users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { IService, SERVICE } from '@app/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

export interface IAuthService extends IService<User, {}, {}> {
  login(user: User, response: Response): Promise<void>
}


export class AuthService implements IAuthService {
  constructor(private configService: ConfigService,
    @Inject(SERVICE) userService: UsersService,
    private jwtService: JwtService
  ) { }

  async login(user: User, response: Response): Promise<void> {
    const jwtPayload: JwtPayload = {
      userId: user._id.toHexString()
    }


    const token = this.jwtService.sign(jwtPayload)

    response.cookie('authentication', token, { httpOnly: true, }).end()
  }

}
