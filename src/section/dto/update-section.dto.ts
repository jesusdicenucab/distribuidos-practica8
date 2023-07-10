import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSectionDto } from './create-section.dto';
import { IsDecimal, IsIn, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntityStatus, SectionType } from 'src/types/types';

export class UpdateSectionDto extends PartialType(CreateSectionDto) {
  @ApiProperty({description: 'Status of the registry. Is optional', type: 'BaseEntityStatus (enabled or disabled)', example: 'enabled'})
  @IsOptional()
  @IsString()
  @IsIn(['enabled', 'disabled'] as const)
  public readonly status?: BaseEntityStatus;
  @ApiProperty({description: 'Name of the section. Is optional', type: 'string', example: 'Sistemas Distribuidos'})
  @IsOptional()
  @IsString()
  public readonly name?: string;
  @ApiProperty({description: 'Description of the section. Is optional', type: 'string', example: 'Seccion de Sistemas Distribuidos'})
  @IsOptional()
  @IsString()
  public readonly description?: string;
  @ApiProperty({description: 'Credit unit of the section. Is optional', type: 'number (int)', example: '8'})
  @IsOptional()
  @IsInt()
  public uc?: number;
  @ApiProperty({description: 'Number of semester. Is optional', type: 'number', example: '9'})
  @IsOptional()
  @IsInt()
  public semester?: number;
  @ApiProperty({description: 'Section type. Can be mandatory, or elective. Is optional', type: 'SectionType (string)', example: 'mandatory'})
  @IsOptional()
  @IsString()
  @IsIn(['mandatory', 'elective'] as const)
  public type?: SectionType;
  @ApiProperty({description: 'Teoric hours. Is optional', type: 'number (float)', example: '2.00'})
  @IsOptional()
  @IsNumber()
  public ht?: number;
  @ApiProperty({description: 'Practice hours. Is optional', type: 'number (float)', example: '2.00'})
  @IsOptional()
  @IsNumber()
  public hp?: number;
  @ApiProperty({description: 'Lab hours. Is optional', type: 'number (float)', example: '2.00'})
  @IsOptional()
  @IsNumber()
  public hl?: number;
}
