import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Entity as EntityClass} from "src/entity/entities/entity.entity";
import { Faculty } from "src/faculty/entities/faculty.entity";
import { Section } from "src/section/entities/section.entity";

@Entity()
export class School extends EntityClass{

  @ManyToOne(() => Faculty, (faculty) => faculty.schools)
  faculty: Faculty;
  @OneToMany(() => Section, (section) => section.school, {nullable: true})
  sections: Section[];

  // public constructor(newFacultyDto: CreateSchoolDto) {
  //   super({
  //     status: newFacultyDto.status,
  //     name: newFacultyDto.name,
  //     description: newFacultyDto.description,
  //     created_date: newFacultyDto.created_date,
  //     deleted_date: newFacultyDto.deleted_date
  //   });
  // }
}
