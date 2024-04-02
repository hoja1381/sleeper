import { Inject } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { IRepository } from '@app/common/database/repository.interface';
import { Model } from 'mongoose';
import { Reservation } from './entities/reservation.entity';

export class ReservationService {
  constructor(@Inject("REPOSITORY") private readonly reservationRepo: IRepository<Reservation>) { }

  async create(createReservationDto: CreateReservationDto) {
    return await this.reservationRepo.create({
      ...createReservationDto,
      userId: "1234"
    })
  }

  async findAll() {
    return await this.reservationRepo.findMany({})
  }

  async findOne(id: string) {
    return await this.reservationRepo.findById(id)
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepo.update({ _id }, updateReservationDto)
  }

  async remove(_id: string) {
    return this.reservationRepo.delete({ _id })
  }
}
