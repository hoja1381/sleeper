import { IRepository, IService, SERVICE } from '@app/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { REPOSITORY } from '@app/common';
import { Inject, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { log } from 'console';

export interface IUserService extends IService<User, CreateUserDto, {}> {
    verifyUser?(email: string, passport: string): Promise<User>
}


export class UsersService implements IUserService {
    constructor(@Inject(REPOSITORY) private readonly userRepo: IRepository<User>) { }

    async create(createDto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createDto.password, 8)
        return await this.userRepo.create({ ...createDto, password: hashedPassword })
    }

    async verifyUser(email: string, password: string): Promise<User> {
        const user = await this.userRepo.findOneWhere({ email })
        log(user)
        const isValidUser = await bcrypt.compare(password, user.password)
        if (!isValidUser) {
            throw new UnauthorizedException('Credentials are not valid.2')
        }
        return user
    }


}
