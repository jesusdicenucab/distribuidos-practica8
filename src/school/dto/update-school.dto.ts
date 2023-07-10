import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSchoolDto } from './create-school.dto';
import { IsArray, IsIn, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseEntityStatus } from 'src/types/types';

export class UpdateSchoolDto extends PartialType(CreateSchoolDto) {
  @ApiProperty({description: 'Status of the registry. Is optional', type: 'BaseEntityStatus (enabled or disabled)', example: 'enabled'})
  @IsOptional()
  @IsIn(['enabled', 'disabled'])
  @IsString()
  public readonly status?: BaseEntityStatus;
  @ApiProperty({description: 'Name of the school. Is optional', type: 'string', example: 'Informatica'})
  @IsOptional()
  @IsString()
  public readonly name?: string;
  @ApiProperty({description: 'Description of the school. Is optional', type: 'string', example: 'Escuela de informática'})
  @IsOptional()
  @IsString()
  public readonly description?: string;
  @ApiProperty({description: 'Facultys ID. Is optional. Must be registered in database', type: 'number', example: '2'})
  @IsOptional()
  @IsInt()
  public readonly facultyId?: number;
  @ApiProperty({description: 'Is an array of sections Ids. Is optional', type: 'number', example: '[1, 2, 3, 4, 5]'})
  @IsOptional()
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => Number)
  public readonly sectionsId?: number[];
}
