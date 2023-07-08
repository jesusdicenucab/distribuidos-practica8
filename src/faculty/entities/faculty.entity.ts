import { Entity, OneToMany } from "typeorm";
import {Entity as EntityClass} from '../../entity/entities/entity.entity';
import { CreateFacultyDto } from "../dto/create-faculty.dto";
import { School } from "src/school/entities/school.entity";

@Entity({name: 'faculties'})
export class Faculty extends EntityClass {

  @OneToMany(() => School, (school) => school.faculty)
  schools: School[];

  // public constructor(newFacultyDto: CreateFacultyDto) {
  //   super({
  //     status: newFacultyDto.status,
  //     name: newFacultyDto.name,
  //     description: newFacultyDto.description,
  //     created_date: newFacultyDto.created_date,
  //     deleted_date: newFacultyDto.deleted_date
  //   });
  // }
}
