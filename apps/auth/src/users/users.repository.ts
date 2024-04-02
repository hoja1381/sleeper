import { AbstractRepository } from "@app/common";
import { Model } from "mongoose";
import { User } from "./entities/user.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Logger } from "@nestjs/common";


export class UserRepository extends AbstractRepository<User> {
    protected readonly logger = new Logger(UserRepository.name)

    constructor(@InjectModel(User.name) reservationModel: Model<User>) {
        super(reservationModel)
    }
}