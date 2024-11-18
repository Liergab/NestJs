import { IsEnum, IsNumber, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  name: string;

  @IsEnum(['Male', 'Female'], {
    message: 'Valid Gender Required!',
  })
  gender: 'Male' | 'Female';
  @IsNumber()
  age: number;
}
