import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from './entities/school.entity';
import { IsNull, Repository } from 'typeorm';
import { SectionService } from 'src/section/section.service';
import { FacultyService } from 'src/faculty/faculty.service';
import { IApplicationResponse } from 'src/utils/application-response/aplication-response.interface';
import { Section } from 'src/section/entities/section.entity';
import { ApplicationResponse } from '../utils/application-response/application-response.util';

@Injectable()
export class SchoolService {

  constructor(
    @InjectRepository(School)
    private readonly _schoolRepository: Repository<School>,
    private readonly _sectionService: SectionService,
    @Inject(forwardRef( () => FacultyService))
    private readonly _facultyService: FacultyService
  ){}

  async create(createSchoolDto: CreateSchoolDto): Promise<IApplicationResponse<School>> {
    try {
      let sections: Section[];
      createSchoolDto.sectionsId?.forEach(async (element: number) => {
        const section = (await this._sectionService.findOne(element)).data;
        section !== null ? sections.push(section[0]) : null;
      })
      const faculty = (await this._facultyService.findOne(createSchoolDto.facultyId)).data;
      if (faculty.length === 0)
        return new ApplicationResponse('No hay registro de esa facultad con ese Id', false, []).GetResponse();
      const newSchool = new School();
      newSchool.name = createSchoolDto.name;
      newSchool.description = createSchoolDto.description;
      newSchool.faculty = faculty[0];
      sections === undefined ? null: newSchool.sections = sections;
      await this._schoolRepository.save(newSchool);
      return new ApplicationResponse('Escuela registrada satisfactoriamente', true, []).GetResponse();
    } catch(error) {
      return new ApplicationResponse('No se logró registrar la escuela', false, []).GetResponse();
    }
  }

  async findAll(): Promise<IApplicationResponse<School>> {
    try {
      const results = await this._schoolRepository.find({where: {status: 'enabled', deletedDate: IsNull()}});
      if (results.length === 0)
        return new ApplicationResponse('No hay escuelas registradas', false, []).GetResponse();
      return new ApplicationResponse('Escuelas registradas', true, results).GetResponse();
    } catch(error) {
      return new ApplicationResponse('Operación fallida', false, []).GetResponse();
    }
  }

  async findOne(id: number): Promise<IApplicationResponse<School>> {
    try {
      const result = await this._schoolRepository.findOne({where: {status: 'enabled', deletedDate: IsNull(), id: id}});
      if (result === null)
        return new ApplicationResponse('Escuela no se encuentra registrada', false, []).GetResponse();
      return new ApplicationResponse('Escuela registrada exitosamente', true, [result]).GetResponse();
    } catch(error) {
      return new ApplicationResponse('Operación fallida', false, []).GetResponse();
    }
  }

  async update(id: number, updateSchoolDto: UpdateSchoolDto): Promise<IApplicationResponse<School>> {
    try {
      let school = await this._schoolRepository.findOne({where: {id: id}});
      if (school === null)
        return new ApplicationResponse('Escuela no registrada', true, []).GetResponse();
      school = {...school, ...updateSchoolDto, faculty: school.faculty}
      await this._schoolRepository.save(school);
      return new ApplicationResponse('Escuela editada correctamente', true, [school]).GetResponse();
    } catch(error) {
      return new ApplicationResponse('Operación fallida', false, []).GetResponse();
    }
  }

  async remove(id: number): Promise<IApplicationResponse<School>> {
    try {
      let faculty = await this._schoolRepository.findOne({where: {id: id}});
      if (faculty === null)
        return new ApplicationResponse('EScuela no se encuentra registrada', false, []).GetResponse();
      faculty = {...faculty, status: 'disabled', deletedDate: new Date()}
      await this._schoolRepository.save(faculty);
      return new ApplicationResponse('Escuela eliminada correctamente', true, [faculty]).GetResponse();
    } catch(error) {
      return new ApplicationResponse('Operación fallida', false, []).GetResponse();
    }
  }
}
