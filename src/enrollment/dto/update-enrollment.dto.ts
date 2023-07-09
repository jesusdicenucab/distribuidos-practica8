import { PartialType } from '@nestjs/swagger';
import { CreateEnrollmentDto } from './create-enrollment.dto';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { BaseEntityStatus } from 'src/types/types';

export class UpdateEnrollmentDto extends PartialType(CreateEnrollmentDto) {
  @IsOptional()
  @IsIn(['enabled', 'disabled'] as const)
  @IsString()
  public status?: BaseEntityStatus;
  @IsOptional()
  @IsInt()
  public personId?: number;
  @IsOptional()
  @IsInt()
  public sectionId?: number;
}
