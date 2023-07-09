import { PartialType } from '@nestjs/swagger';
import { CreatePersonDto } from './create-person.dto';
import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator';
import { BaseEntityStatus } from 'src/types/types';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
  @IsOptional()
  @IsString()
  @IsIn(['enabled', 'disabled'] as const)
  public readonly status?: BaseEntityStatus;
  @IsString()
  @IsOptional()
  public readonly dni?: string;
  @IsString()
  @IsOptional()
  public readonly firstName?: string;
  @IsString()
  @IsOptional()
  public readonly lastName?: string;
  @IsDateString()
  @IsOptional()
  public readonly createdDate?: Date;
  @IsDateString()
  @IsOptional()
  public readonly deletedDate?: Date;
}
