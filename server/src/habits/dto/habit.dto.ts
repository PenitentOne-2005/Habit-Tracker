import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateHabitDto {
  @IsString()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateHabitDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
