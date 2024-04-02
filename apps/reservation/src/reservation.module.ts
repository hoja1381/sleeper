import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { DatabaseModule } from '@app/common';
import { ReservationRepository } from './reservation.repository';
import { Reservation, reservationSchema } from './entities/reservation.entity';
import { REPOSITORY } from '@app/common/database/repository.interface';
import { SERVICE } from '@app/common';
@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([{ name: Reservation.name, schema: reservationSchema }])],
  controllers: [ReservationController],
  providers: [
    { provide: SERVICE, useClass: ReservationService },
    { provide: REPOSITORY, useClass: ReservationRepository }
  ],
})
export class ReservationModule { }
