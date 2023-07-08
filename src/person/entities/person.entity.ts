import { BaseEntity } from "src/base-entity/entities/base-entity.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { CreatePersonDto } from "../dto/create-person.dto";
import { Enrollment } from "src/enrollment/entities/enrollment.entity";

@Entity({name: 'persons'})
export class Person extends BaseEntity {
  @Column({type: 'text' ,unique: true})
  dni: string;
  @Column({type:'text', name: 'first_name'})
  firstName: string;
  @Column({type:'text', name: 'last_name'})
  lastName: string;
  @OneToMany(() => Enrollment, (enrrollment) => enrrollment.person)
  enrollments: Enrollment[];

  // public constructor(newPersonDto: CreatePersonDto) {
  //   super(newPersonDto.status, newPersonDto.created_date, newPersonDto.deleted_date);
  //   this.dni = newPersonDto.dni;
  //   this.firstName = newPersonDto.first_name;
  //   this.lastName = newPersonDto.last_name;
  // }
}
