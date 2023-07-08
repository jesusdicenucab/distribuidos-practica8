import { BaseEntityStatus, EnrollmentType } from "src/types/types";
import {IsString, IsIn, IsDate} from 'class-validator';

export class CreateEnrollmentDto {
  @IsString()
  @IsIn(['enabled', 'disabled'] as const)
  public status: BaseEntityStatus;
  @IsDate()
  public created_date: Date;
  @IsDate()
  public deleted_date?: Date;
  @IsString()
  @IsIn(['student', 'teacher'] as const)
  public type: EnrollmentType;
}
