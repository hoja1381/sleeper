import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { DatabaseModule } from '@app/common';
import { ReservationRepository } from './reservation.repository';
import { Reservation, reservationSchema } from './entities/reservation.entity';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([{ name: Reservation.name, schema: reservationSchema }])],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepository],
})
export class ReservationModule { }
