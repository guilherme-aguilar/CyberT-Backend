import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class changePasswordUserDto {

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  currentPassword: string;
}
