import { IService, SERVICE } from '@app/common';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
    constructor(@Inject(SERVICE) private readonly userService: IService<User, CreateUserDto, {}>) { }

    @Post()
    async createUser(@Body() createUser: CreateUserDto) {
        return await this.userService.create(createUser)
    }
}
