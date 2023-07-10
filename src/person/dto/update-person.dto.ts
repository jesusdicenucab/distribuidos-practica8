import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePersonDto } from './create-person.dto';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { BaseEntityStatus } from 'src/types/types';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
  @ApiProperty({description: 'The status of the registry. Must be enabled or disabled. Is optional', example: 'enabled', type: 'BaseEntityStatus (string)'})
  @IsOptional()
  @IsString()
  @IsIn(['enabled', 'disabled'] as const)
  public readonly status?: BaseEntityStatus;
  @ApiProperty({description: 'The DNI of an user. Is optional', example: '21092580', type: 'string'})
  @IsString()
  @IsOptional()
  public readonly dni?: string;
  @ApiProperty({description: 'User first name. Is optional', example: 'Andres', type: 'string'})
  @IsString()
  @IsOptional()
  public readonly firstName?: string;
  @ApiProperty({description: 'User last name. Is optional', example: 'Gonzalez', type: 'string'})
  @IsString()
  @IsOptional()
  public readonly lastName?: string;
  // @IsDateString()
  // @IsOptional()
  // public readonly createdDate?: Date;
  // @IsDateString()
  // @IsOptional()
  // public readonly deletedDate?: Date;
}
