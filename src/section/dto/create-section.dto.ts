
import { IsString, IsDate, IsIn, IsInt, IsNumber, IsDecimal } from "class-validator";
import { BaseEntityStatus, SectionType } from "src/types/types";

export class CreateSectionDto {
  @IsString()
  @IsIn(['enabled', 'disabled'] as const)
  public readonly status: BaseEntityStatus;
  @IsDate()
  public readonly created_date: Date;
  @IsDate()
  public readonly deleted_date?: Date;
  @IsString()
  public readonly name: string;
  @IsString()
  public readonly description: string;
  @IsInt()
  public uc: number;
  @IsInt()
  public semester: number;
  @IsString()
  @IsIn(['mandatory', 'elective'] as const)
  public type: SectionType;
  @IsNumber()
  @IsDecimal({decimal_digits: '2'})
  public ht: number;
  @IsNumber()
  @IsDecimal({decimal_digits: '2'})
  public hp: number;
  @IsNumber()
  @IsDecimal({decimal_digits: '2'})
  public hl: number;
}
