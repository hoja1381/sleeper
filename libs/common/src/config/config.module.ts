import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
    imports: [NestConfigModule.forRoot({
        validationSchema: Joi.object({
            MONGO_URI: Joi.string().required(),
            JWT_SEC: Joi.string().required(),
            JWT_EXP: Joi.number(),
            PORT_RESERVATION: Joi.number(),
            PORT_AUTH: Joi.number()
        })
    })],
    providers: [ConfigService]
})
export class ConfigModule { }
