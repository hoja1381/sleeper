import { IRepository, IService } from '@app/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { REPOSITORY } from '@app/common';
import { BadRequestException, HttpException, Inject, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

export interface IUserService extends IService<User, CreateUserDto, {}> {
    verifyUser?(email: string, passport: string): Promise<User>
}


export class UsersService implements IUserService {
    constructor(@Inject(REPOSITORY) private readonly userRepo: IRepository<User>) { }

    async create(createDto: CreateUserDto): Promise<User> {
        //this._checkEmailUnique(createDto.email)
        const hashedPassword = await bcrypt.hash(createDto.password, 8)
        return await this.userRepo.create({ ...createDto, password: hashedPassword } as User)
    }

    async _checkEmailUnique(email: string): Promise<void> {
        try {
            await this.userRepo.findOneWhere({ email })
        } catch (err) {
            return
        }
        throw new HttpException({}, 404)
    }

    async verifyUser(email: string, password: string): Promise<User> {
        const user = await this.userRepo.findOneWhere({ email })
        const isValidUser = await bcrypt.compare(password, user.password)
        if (!isValidUser) {
            throw new UnauthorizedException('Credentials are not valid.2')
        }
        return user
    }

    async findOne(id: string): Promise<User> {
        return await this.userRepo.findById(id)
    }


}
