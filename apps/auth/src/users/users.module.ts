import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule, REPOSITORY, SERVICE } from '@app/common';
import { UserRepository } from './users.repository';
import { User, userSchema } from './entities/user.entity';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    { provide: SERVICE, useClass: UsersService },
    { provide: REPOSITORY, useClass: UserRepository }
  ],
  exports: [
    { provide: SERVICE, useClass: UsersService },
    { provide: REPOSITORY, useClass: UserRepository }
  ]
})
export class UsersModule { }
