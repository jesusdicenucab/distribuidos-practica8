import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateFacultyDto {
  @ApiProperty({description: 'Name: Faculty name', type: 'string', example: 'Ingenieria'})
  @IsString()
  public readonly name: string;
  @ApiProperty({description: 'Description: Faculty description', type: 'string', example: 'Facultad de Ingenieria'})
  @IsString()
  public readonly description: string;
  @ApiProperty({description: 'Array of Schools ID', type: 'string[]', example: '[1, 2, 3, 4, 5]'})
  @IsOptional()
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => Number)
  public readonly schoolsId?: number[];
}
