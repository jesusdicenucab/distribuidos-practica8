
import { IsString, IsIn, IsInt, IsNumber, IsDecimal } from "class-validator";
import { SectionType } from "src/types/types";

export class CreateSectionDto {
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
  // @IsDecimal({decimal_digits: '2'})
  @IsNumber()
  public ht: number;
  // @IsDecimal({decimal_digits: '2'})
  @IsNumber()
  public hp: number;
  // @IsDecimal({decimal_digits: '2'})
  @IsNumber()
  public hl: number;
}
