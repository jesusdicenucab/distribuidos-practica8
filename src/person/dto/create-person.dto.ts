import { IsString, IsIn } from "class-validator";

export class CreatePersonDto {
  // @IsString()
  // @IsIn(['enabled', 'disabled'] as const)
  // public readonly status: BaseEntityStatus;
  @IsString()
  public readonly dni: string;
  @IsString()
  public readonly firstName: string;
  @IsString()
  public readonly lastName: string;
}
