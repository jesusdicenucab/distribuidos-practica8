import { PartialType } from '@nestjs/swagger';
import { CreateFacultyDto } from './create-faculty.dto';
import { IsArray, IsIn, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseEntityStatus } from 'src/types/types';

export class UpdateFacultyDto extends PartialType(CreateFacultyDto) {
  @IsOptional()
  @IsIn(['enabled', 'disabled'])
  @IsString()
  status?: BaseEntityStatus;
  @IsOptional()
  @IsString()
  public readonly name?: string;
  @IsOptional()
  @IsString()
  public readonly description?: string;
  @IsOptional()
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => Number)
  public readonly schoolsId?: number[];
}
