import { Module } from '@nestjs/common';
import { AuthController, InjectionToken } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SERVICE } from '@app/common';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from './users/users.service';

@Module({
  imports: [UsersModule, ConfigModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>("JWT_SEC"),
      signOptions: {
        expiresIn: `${configService.get<string>('JWT_EXP')}s`
      }
    }),
  })],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: SERVICE, useClass: UsersService },
    LocalStrategy
  ],
})
export class AuthModule { }
