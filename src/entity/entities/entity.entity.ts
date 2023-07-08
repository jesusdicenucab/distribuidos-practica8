import { BaseEntity } from "src/base-entity/entities/base-entity.entity";
import { CreateEntityDto } from "../dto/create-entity.dto";
import { Column } from "typeorm";

export abstract class Entity extends BaseEntity {
  @Column({type: 'text'})
  name: string;
  @Column({type: 'text'})
  description: string;

  // public constructor(newEntityDTO: CreateEntityDto) {
  //   super(newEntityDTO.status, newEntityDTO.created_date, newEntityDTO.deleted_date);
  //   this.name = newEntityDTO.name;
  //   this.description = newEntityDTO.description;
  // }
}
