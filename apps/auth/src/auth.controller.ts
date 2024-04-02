import { Controller, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './decorators/currentUser.decorator';
import { User } from './users/entities/user.entity';
import { SERVICE } from '@app/common';
import { AuthService, IAuthService } from './auth.service';
import { Response } from 'express'

export const InjectionToken = `${SERVICE}-Auth`

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: User, @Res() response: Response) {
    await this.authService.login(user, response)
  }

}
