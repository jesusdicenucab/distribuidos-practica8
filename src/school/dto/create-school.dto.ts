import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsInt, IsOptional, IsArray, ValidateNested } from "class-validator";

export class CreateSchoolDto {
  @ApiProperty({description: 'The school name', type: 'string', example: 'Informatica'})
  @IsString()
  public readonly name: string;
  @ApiProperty({description: 'The school description', type: 'string', example: 'Escuela de Informatica'})
  @IsString()
  public readonly description: string;
  @ApiProperty({description: 'Faculty ID. Must be registered', type: 'number', example: '1'})
  @IsInt()
  public readonly facultyId: number;
  @ApiProperty({description: 'Is an array of sections Ids. Is optional', type: 'number', example: '[1, 2, 3, 4, 5]'})
  @IsOptional()
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => Number)
  public readonly sectionsId?: number[];
}
