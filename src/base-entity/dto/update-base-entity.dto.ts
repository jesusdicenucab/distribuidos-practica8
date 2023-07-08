import { PartialType } from '@nestjs/swagger';
import { CreateBaseEntityDto } from './create-base-entity.dto';

export class UpdateBaseEntityDto extends PartialType(CreateBaseEntityDto) {}
