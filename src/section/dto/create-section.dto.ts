
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsIn, IsInt, IsNumber, IsDecimal } from "class-validator";
import { SectionType } from "src/types/types";

export class CreateSectionDto {
  @ApiProperty({description: 'The section name', type: 'string', example: 'Sistemas Distribuidos'})
  @IsString()
  public readonly name: string;
  @ApiProperty({description: 'Section description', type: 'string', example: 'Seccion de Sistemas Distribuidos'})
  @IsString()
  public readonly description: string;
  @ApiProperty({description: 'Credit unit of the section', type: 'number', example: '8'})
  @IsInt()
  public uc: number;
  @ApiProperty({description: 'Number of semester', type: 'number', example: '9'})
  @IsInt()
  public semester: number;
  @ApiProperty({description: 'Section type. Can be mandatory, or elective', type: 'SectionType (string)', example: 'mandatory'})
  @IsString()
  @IsIn(['mandatory', 'elective'] as const)
  public type: SectionType;
  @ApiProperty({description: 'Teoric hours', type: 'number (float)', example: '2.00'})
  @IsNumber()
  public ht: number;
  @ApiProperty({description: 'Practice hours', type: 'number (float)', example: '2.00'})
  @IsNumber()
  public hp: number;
  @ApiProperty({description: 'Laboratory hours', type: 'number (float)', example: '2.00'})
  @IsNumber()
  public hl: number;
}
