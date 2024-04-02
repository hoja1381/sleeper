import { Inject } from '@nestjs/common';
import { User } from './users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { IService } from '@app/common';
import { Response } from 'express';

export interface IAuthService extends IService<User, {}, {}> {
  login(user: User, response: Response): Promise<void>
}


export class AuthService implements IAuthService {
  constructor(private jwtService: JwtService) { }


  async login(user: User, response: Response): Promise<void> {
    const jwtPayload = {
      userId: user._id.toHexString()
    }

    const token = this.jwtService.sign(jwtPayload)

    response.cookie('authentication', token, { httpOnly: true, })
  }

}
