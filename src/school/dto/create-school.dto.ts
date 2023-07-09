import { Type } from "class-transformer";
import { IsString, IsInt, IsOptional, IsArray, ValidateNested } from "class-validator";

export class CreateSchoolDto {
  @IsString()
  public readonly name: string;
  @IsString()
  public readonly description: string;
  @IsInt()
  public readonly facultyId: number;
  @IsOptional()
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => Number)
  public readonly sectionsId?: number[];
}
