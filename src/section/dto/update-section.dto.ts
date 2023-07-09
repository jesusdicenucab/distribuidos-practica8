import { PartialType } from '@nestjs/swagger';
import { CreateSectionDto } from './create-section.dto';
import { IsDecimal, IsIn, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntityStatus, SectionType } from 'src/types/types';

export class UpdateSectionDto extends PartialType(CreateSectionDto) {
  @IsOptional()
  @IsString()
  @IsIn(['enabled', 'disabled'] as const)
  public readonly status?: BaseEntityStatus;
  @IsOptional()
  @IsString()
  public readonly name?: string;
  @IsOptional()
  @IsString()
  public readonly description?: string;
  @IsOptional()
  @IsInt()
  public uc?: number;
  @IsOptional()
  @IsInt()
  public semester?: number;
  @IsOptional()
  @IsString()
  @IsIn(['mandatory', 'elective'] as const)
  public type?: SectionType;
  @IsOptional()
  @IsNumber()
  // @IsDecimal({decimal_digits: '2'})
  public ht?: number;
  @IsOptional()
  @IsNumber()
  // @IsDecimal({decimal_digits: '2'})
  public hp?: number;
  @IsOptional()
  @IsNumber()
  // @IsDecimal({decimal_digits: '2'})
  public hl?: number;
}
