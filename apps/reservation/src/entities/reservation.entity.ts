import { AbstractEntity } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({ versionKey: false, timestamps: true })
export class Reservation extends AbstractEntity {
    @Prop()
    startDate: Date

    @Prop()
    endDate: Date

    @Prop()
    userId: string

    @Prop()
    placeId: string

    @Prop()
    invoiceId: string
}

export const reservationSchema = SchemaFactory.createForClass(Reservation)