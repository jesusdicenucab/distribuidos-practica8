import { IsString, IsDate, IsIn } from "class-validator";
import { BaseEntityStatus } from "src/types/types";

export class CreateSchoolDto {
  @IsIn(['enabled', 'disabled'] as const)
  @IsString()
  public readonly status: BaseEntityStatus;
  @IsDate()
  public readonly created_date: Date;
  @IsDate()
  public readonly deleted_date?: Date;
  @IsString()
  public readonly name: string;
  @IsString()
  public readonly description: string;
}
