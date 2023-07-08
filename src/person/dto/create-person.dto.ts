import { IsString, IsDate, IsIn } from "class-validator";
import { BaseEntityStatus } from "src/types/types";

export class CreatePersonDto {
  @IsString()
  @IsIn(['enabled', 'disabled'] as const)
  public readonly status: BaseEntityStatus;
  @IsDate()
  public readonly created_date: Date;
  @IsDate()
  public readonly deleted_date: Date;
  @IsString()
  public readonly dni: string;
  @IsString()
  public readonly first_name: string;
  @IsString()
  public readonly last_name: string;
}
