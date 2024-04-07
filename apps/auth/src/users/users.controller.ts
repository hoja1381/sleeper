import { IService, SERVICE } from '@app/common';
import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';


@Controller('users')
export class UsersController {
    constructor(@Inject(SERVICE) private readonly userService: IService<User, CreateUserDto, {}>) { }

    @Post()
    async createUser(@Body() createUser: CreateUserDto) {
        return await this.userService.create(createUser)
    }


    @Get()
    @UseGuards(JwtAuthGuard)
    async getCurrentUser(@CurrentUser() user: User) {
        return user
    }
}
