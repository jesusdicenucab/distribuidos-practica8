import { Column, Entity, ManyToOne } from "typeorm";
import { CreateEnrollmentDto } from '../dto/create-enrollment.dto';
import { BaseEntity } from "src/base-entity/entities/base-entity.entity";
import { Section } from "src/section/entities/section.entity";
import { Person } from "src/person/entities/person.entity";

@Entity({name: 'enrollments'})
export class Enrollment extends BaseEntity {

  @Column({type: 'text'})
  type: string;
  @ManyToOne(() => Section, (section) => section.enrollments)
  section: Section;
  @ManyToOne(() => Person, (person) => person.enrollments)
  person: Person;

  // public constructor(newEnrollment: CreateEnrollmentDto) {
  //   super(newEnrollment.status, newEnrollment.created_date, newEnrollment.deleted_date);
  //   this.type = newEnrollment.type;
  // }
}
