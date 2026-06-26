import { IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(6)
  password: string;
}
