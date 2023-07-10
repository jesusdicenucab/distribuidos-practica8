import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Faculty } from './entities/faculty.entity';
import { IsNull, Repository } from 'typeorm';
import { ApplicationResponse } from 'src/utils/application-response/application-response.util';
import { IApplicationResponse } from 'src/utils/application-response/aplication-response.interface';
import { School } from 'src/school/entities/school.entity';
import { SchoolService } from 'src/school/school.service';

@Injectable()
export class FacultyService {

  constructor(
    @InjectRepository(Faculty)
    private readonly _facultyRepository: Repository<Faculty>,
    @Inject(forwardRef( () => SchoolService))
    private readonly _schoolService: SchoolService
  ){}

  async create(createFacultyDto: CreateFacultyDto): Promise<IApplicationResponse<Faculty>> {
    try {
      let schools: School[];
      createFacultyDto.schoolsId?.forEach(async (element: number) => {
        const school = (await this._schoolService.findOne(element)).data;
        school !== null ? schools.push(school[0]) : null;
      })
      const newFaculty = new Faculty();
      newFaculty.schools = schools;
      newFaculty.name = createFacultyDto.name;
      newFaculty.description = createFacultyDto.description;
      await this._facultyRepository.save(newFaculty);
      return new ApplicationResponse('Facultad registrada satisfactoriamente', true, []).GetResponse();
    } catch(error) {
      return new ApplicationResponse('No se logró registrar la facultad', false, []).GetResponse();
    }
  }

  async findAll(): Promise<IApplicationResponse<Faculty>> {
    try {
      const results = await this._facultyRepository.find({where: {status: 'enabled', deletedDate: IsNull()}});
      if (results.length === 0)
        return new ApplicationResponse('No hay facultades registradas', false, []).GetResponse();
      return new ApplicationResponse('Facultades registradas', true, results).GetResponse();
    } catch(error) {
      return new ApplicationResponse('Operación fallida', false, []).GetResponse();
    }
  }

  async findOne(id: number): Promise<IApplicationResponse<Faculty>> {
    try {
      const result = await this._facultyRepository.findOne({where: {status: 'enabled', deletedDate: IsNull(), id: id}});
      if (result === null)
        return new ApplicationResponse('Facultad no registrada', false, []).GetResponse();
      return new ApplicationResponse('Facultad registrada exitosamente', true, [result]).GetResponse();
    } catch(error) {
      return new ApplicationResponse('Operación fallida', false, []).GetResponse();
    }
  }

  async update(id: number, updateFacultyDto: UpdateFacultyDto): Promise<IApplicationResponse<Faculty>> {
    try {
      let faculty = await this._facultyRepository.findOne({where: {id: id}});
      if (faculty === null)
        return new ApplicationResponse('Facultad no se encuentra registrada', true, []).GetResponse();
      faculty = {...faculty, ...updateFacultyDto, schools: faculty.schools}
      await this._facultyRepository.save(faculty);
      return new ApplicationResponse('Facultad editada correctamente', true, [faculty]).GetResponse();
    } catch(error) {
      return new ApplicationResponse('Operación fallida', false, []).GetResponse();
    }
  }

  async remove(id: number): Promise<IApplicationResponse<Faculty>> {
    try {
      let faculty = await this._facultyRepository.findOne({where: {id: id}});
      if (faculty === null)
        return new ApplicationResponse('Facultad no se encuentra registrada', false, []).GetResponse();
      faculty = {...faculty, status: 'disabled', deletedDate: new Date()}
      await this._facultyRepository.save(faculty);
      return new ApplicationResponse('Facultad eliminada correctamente', true, [faculty]).GetResponse();
    } catch(error) {
      return new ApplicationResponse('Operación fallida', false, []).GetResponse();
    }
  }
}
