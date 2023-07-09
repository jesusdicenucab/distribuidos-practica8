import { IsString, IsDate, IsIn, IsDateString } from "class-validator";
import { BaseEntityStatus } from "src/types/types";

export class CreateSchoolDto {
  @IsIn(['enabled', 'disabled'] as const)
  @IsString()
  public readonly status: BaseEntityStatus;
  @IsDateString()
  public readonly createdDate: Date;
  @IsDateString()
  public readonly deletedDate?: Date;
  @IsString()
  public readonly name: string;
  @IsString()
  public readonly description: string;
}
