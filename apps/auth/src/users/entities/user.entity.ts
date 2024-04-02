import { AbstractEntity } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({ versionKey: false, timestamps: true })
export class User extends AbstractEntity {
    @Prop()
    email: string

    @Prop()
    password: string
}

export const userSchema = SchemaFactory.createForClass(User)