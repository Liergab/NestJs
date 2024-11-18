import { IsEmail, IsEnum, IsString } from 'class-validator';
export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'])
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
