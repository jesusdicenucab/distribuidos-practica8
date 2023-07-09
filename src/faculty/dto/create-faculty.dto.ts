import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateFacultyDto {
  @IsString()
  public readonly name: string;
  @IsString()
  public readonly description: string;
  @IsOptional()
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => Number)
  public readonly schoolsId?: number[];
}
