import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDTO {
  @Length(4, 25)
  name: string;

  @Length(6, 80)
  password: string;

  @IsNotEmpty({ message: 'confirm your password' })
  passwordConfirmation: string;
}
