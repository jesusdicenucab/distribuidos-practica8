import { PartialType } from '@nestjs/swagger';
import { CreateEnrollmentDto } from './create-enrollment.dto';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { BaseEntityStatus, EnrollmentType } from 'src/types/types';

export class UpdateEnrollmentDto extends PartialType(CreateEnrollmentDto) {
  @IsOptional()
  @IsIn(['teacher', 'student'])
  @IsString()
  public type?: EnrollmentType;
  @IsOptional()
  @IsIn(['enabled', 'disabled'] as const)
  @IsString()
  public status?: BaseEntityStatus;
  @IsOptional()
  @IsString()
  public personDni?: string;
  @IsOptional()
  @IsInt()
  public sectionId?: number;
}
