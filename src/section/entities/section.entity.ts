import { Check, Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Entity as EntityClass } from "src/entity/entities/entity.entity";
import { SectionType } from "src/types/types";
import { School } from "src/school/entities/school.entity";
import { Enrollment } from "src/enrollment/entities/enrollment.entity";

@Entity({name: 'sections'})
export class Section extends EntityClass {

  @Column({type: 'integer'})
  uc: number;
  @Column({type: 'integer'})
  semester: number;
  @Column({type: 'text'})
  type: SectionType;
  @Column({type: 'float'})
  ht: number;
  @Column({type: 'float'})
  hp: number;
  @Column({type: 'float'})
  hl: number;
  @Check(`type in ('mandatory', 'elective')`)
  typeCheck: boolean;
  @ManyToOne(() => School, (school) => school.sections)
  school: School;
  @OneToMany(() => Enrollment, (enrollment) => enrollment.section)
  enrollments: Enrollment[];

  // public constructor(newSectionDto: CreateSectionDto) {
  //   super({
  //     status: newSectionDto.status,
  //     name: newSectionDto.name,
  //     description: newSectionDto.description,
  //     created_date: newSectionDto.created_date,
  //     deleted_date: newSectionDto.deleted_date,
  //   });
  //   this.uc = newSectionDto.uc;
  //   this.semester = newSectionDto.semester;
  //   this.type = newSectionDto.type;
  //   this.ht = newSectionDto.ht;
  //   this.hp = newSectionDto.hp;
  //   this.hl = this.hl;
  // }
}
