import { EnrollmentType } from "src/types/types";
import {IsString, IsIn, IsInt} from 'class-validator';

export class CreateEnrollmentDto {
  @IsString()
  @IsIn(['student', 'teacher'] as const)
  public type: EnrollmentType;
  @IsInt()
  public sectionId: number;
  @IsString()
  public personDni: string;
}
