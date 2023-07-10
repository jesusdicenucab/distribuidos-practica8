import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFacultyDto } from './create-faculty.dto';
import { IsArray, IsIn, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseEntityStatus } from 'src/types/types';

export class UpdateFacultyDto extends PartialType(CreateFacultyDto) {
  @ApiProperty({description: 'Status of the registry. Can be enabled or disabled. Is optional', type: 'BaseEntityStatus (string)', example: 'enabled'})
  @IsOptional()
  @IsIn(['enabled', 'disabled'])
  @IsString()
  status?: BaseEntityStatus;
  @ApiProperty({description: 'Name of the faculty. Is optional', type: 'string', example: 'Arquitectura'})
  @IsOptional()
  @IsString()
  public readonly name?: string;
  @ApiProperty({description: 'Description of the faculty. Is optional', type: 'string', example: 'Facultad de Arquitectura'})
  @IsOptional()
  @IsString()
  public readonly description?: string;
  @ApiProperty({description: 'Schools ID of the faculty. Is optional', type: 'number', example: '[1, 2, 3, 4, 5]'})
  @IsOptional()
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => Number)
  public readonly schoolsId?: number[];
}
