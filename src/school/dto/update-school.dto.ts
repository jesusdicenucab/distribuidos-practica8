import { PartialType } from '@nestjs/swagger';
import { CreateSchoolDto } from './create-school.dto';
import { IsArray, IsIn, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseEntityStatus } from 'src/types/types';

export class UpdateSchoolDto extends PartialType(CreateSchoolDto) {
  @IsOptional()
  @IsIn(['enabled', 'disabled'])
  @IsString()
  public readonly status?: BaseEntityStatus;
  @IsOptional()
  @IsString()
  public readonly name?: string;
  @IsOptional()
  @IsString()
  public readonly description?: string;
  @IsOptional()
  @IsInt()
  public readonly facultyId?: number;
  @IsOptional()
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => Number)
  public readonly sectionsId?: number[];
}
