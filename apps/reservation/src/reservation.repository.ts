import { AbstractRepository } from "@app/common";
import { Reservation } from "./entities/reservation.entity";
import { Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


export class ReservationRepository extends AbstractRepository<Reservation> {
    protected readonly logger = new Logger(ReservationRepository.name)

    constructor(@InjectModel(Reservation.name) reservationModel: Model<Reservation>) {
        super(reservationModel)
    }
}