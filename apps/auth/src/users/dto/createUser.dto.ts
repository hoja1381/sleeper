import { IsEmail, IsObject, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string

    @IsStrongPassword()
    password: string

    @IsObject()
    child: Object
}