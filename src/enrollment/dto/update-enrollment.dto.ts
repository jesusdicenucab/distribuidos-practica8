import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEnrollmentDto } from './create-enrollment.dto';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { BaseEntityStatus, EnrollmentType } from 'src/types/types';

export class UpdateEnrollmentDto extends PartialType(CreateEnrollmentDto) {
  @ApiProperty({description: 'Enrollment type: can be student or teacher. Is optional', type: 'string', example: 'teacher'})
  @IsOptional()
  @IsIn(['teacher', 'student'])
  @IsString()
  public type?: EnrollmentType;
  @ApiProperty({description: 'Registry status: can be enabled or disabled. Is optional', type: 'BaseEntityStatus (string)', example: 'enabled'})
  @IsOptional()
  @IsIn(['enabled', 'disabled'] as const)
  @IsString()
  public status?: BaseEntityStatus;
  @ApiProperty({description: 'Person DNI: must be a registered person DNI. Is optional', type: 'string', example: '27028320'})
  @IsOptional()
  @IsString()
  public personDni?: string;
  @ApiProperty({description: 'Section ID: must be a registered section ID. Is optional', type: 'number (int)', example: '1'})
  @IsOptional()
  @IsInt()
  public sectionId?: number;
}
