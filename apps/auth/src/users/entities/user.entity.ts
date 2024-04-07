import { AbstractEntity } from "@app/common";
import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import mongoose from "mongoose";


@Schema({ versionKey: false, timestamps: true })
export class User extends AbstractEntity {
    @Prop()
    email: string

    @Prop()
    password: string

    @Prop(raw({
        _id: { type: mongoose.Types.ObjectId, auto: true },
        name: String,
        age: Number
    }))
    child: Record<string, any>
}

export const userSchema = SchemaFactory.createForClass(User)