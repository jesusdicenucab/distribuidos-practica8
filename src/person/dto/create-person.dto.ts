import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsIn } from "class-validator";

export class CreatePersonDto {
  // @IsString()
  // @IsIn(['enabled', 'disabled'] as const)
  // public readonly status: BaseEntityStatus;
  @ApiProperty({description: 'The user DNI. Must be unique', type: 'string', example: '27028320'})
  @IsString()
  public readonly dni: string;
  @ApiProperty({description: 'The user First Name', example: 'Jesus', type: 'string'})
  @IsString()
  public readonly firstName: string;
  @ApiProperty({description: 'The user Last Name', example: 'Diaz', type: 'string'})
  @IsString()
  public readonly lastName: string;
}
