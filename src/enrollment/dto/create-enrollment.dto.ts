import { EnrollmentType } from "src/types/types";
import {IsString, IsIn, IsInt} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateEnrollmentDto {
  @ApiProperty({description: 'Enrollment type: can be student or teacher', type: 'string', example: 'student'})
  @IsString()
  @IsIn(['student', 'teacher'] as const)
  public type: EnrollmentType;
  @ApiProperty({description: 'Section ID: the section number', type: 'number (int)', example: '1'})
  @IsInt()
  public sectionId: number;
  @IsString()
  @ApiProperty({description: 'Person DNI: must be a registered dni', type: 'number (int)', example: '2'})
  public personDni: string;
}
