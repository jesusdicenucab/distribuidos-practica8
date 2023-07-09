import { Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { IsNull, Repository } from 'typeorm';
import { IApplicationResponse } from 'src/utils/application-response/aplication-response.interface';
import { ApplicationResponse } from 'src/utils/application-response/application-response.util';
import { PersonService } from 'src/person/person.service';
import { SectionService } from 'src/section/section.service';
import { Person } from 'src/person/entities/person.entity';

@Injectable()
export class EnrollmentService {

  constructor(
    @InjectRepository(Enrollment)
    private readonly _enrollmentRepository: Repository<Enrollment>,
    private readonly _personService: PersonService,
    private readonly _sectionService: SectionService
  ){}

  async create(createEnrollmentDto: CreateEnrollmentDto): Promise<IApplicationResponse<Enrollment>> {
    try {
      const personResponse = await this._personService.findOne(createEnrollmentDto.personDni);
      if (personResponse === null)
        return new ApplicationResponse('Persona no se encuentra registrada en el sistema', false, []).GetResponse();
      const sectionResponse = await this._sectionService.findOne(createEnrollmentDto.sectionId);
      if (sectionResponse === null)
        return new ApplicationResponse('Sección no se encuentra registrada en el sistema', false, []).GetResponse();
      const newEnrollment = new Enrollment();
      newEnrollment.person = personResponse.data[0];
      newEnrollment.section = sectionResponse.data[0];
      newEnrollment.type = createEnrollmentDto.type;
      await this._enrollmentRepository.save(newEnrollment);
      return new ApplicationResponse('Enrollment registrado satisfactoriamente', true, []).GetResponse();
    } catch(error) {
      return new ApplicationResponse('No se logró registrar a el enrollment', false, []).GetResponse();
    }
  }

  async findAll(): Promise<IApplicationResponse<Enrollment>> {
    try {
      const results = await this._enrollmentRepository.find({where: {status: 'enabled', deletedDate: IsNull()}});
      if (results.length === 0)
        return new ApplicationResponse('No hay enrollments registrados', false, []).GetResponse();
      return new ApplicationResponse('Enrollment registrado', true, results).GetResponse();
    } catch(error) {
      return new ApplicationResponse('Operación fallida', false, []).GetResponse();
    }
  }

  async findOne(id: number): Promise<IApplicationResponse<Enrollment>> {
    try {
      const result = await this._enrollmentRepository.findOne({where: {status: 'enabled', deletedDate: IsNull(), id: id}});
      if (result === null)
        return new ApplicationResponse('Enrollment no registrado', false, []).GetResponse();
      return new ApplicationResponse('Enrollment registrado', true, [result]).GetResponse();
    } catch(error) {
      return new ApplicationResponse('Operación fallida', false, []).GetResponse();
    }
  }

  async update(id: number, updateEnrollmentDto: UpdateEnrollmentDto): Promise<IApplicationResponse<Enrollment>> {
    try {
      let Enrollment = await this._enrollmentRepository.findOne({where: {id: id}});
      if (Enrollment === null)
        return new ApplicationResponse('Enrollment no registrado', true, []).GetResponse();
      Enrollment = {...Enrollment, ...updateEnrollmentDto}
      await this._enrollmentRepository.save(Enrollment);
      return new ApplicationResponse('Enrollment editado correctamente', true, [Enrollment]).GetResponse();
    } catch(error) {
      return new ApplicationResponse('Operación fallida', false, []).GetResponse();
    }
  }

  async remove(id: number): Promise<IApplicationResponse<Enrollment>> {
    try {
      let Enrollment = await this._enrollmentRepository.findOne({where: {id: id}});
      if (Enrollment === null)
        return new ApplicationResponse('Enrollment no registrado', false, []).GetResponse();
      Enrollment = {...Enrollment, status: 'disabled', deletedDate: new Date()}
      await this._enrollmentRepository.save(Enrollment);
      return new ApplicationResponse('Enrollment eliminado correctamente', true, [Enrollment]).GetResponse();
    } catch(error) {
      return new ApplicationResponse('Operación fallida', false, []).GetResponse();
    }
  }

  async getPersonsByTypeAndSection(sectionId: number, type: string): Promise<IApplicationResponse<Person>> {
    try {
      const results = await this._enrollmentRepository.find({
        select: ['person'],
        relations: ['person'],
        where: {
          section: {id: sectionId, status: 'enabled', deletedDate: IsNull()},
          person: {status: 'enabled', deletedDate: IsNull()},
          type,
          status: 'enabled',
          deletedDate: IsNull()
        }
      });
      if (results.length === 0)
        return new ApplicationResponse(`No hay ${type}s registrados que cumplan con dicho requerimiento`, false, []).GetResponse();
      const data = results.map(element => element.person);
      return new ApplicationResponse(`${type}s registrados`, true, data).GetResponse();
    } catch(error) {
      console.log(error);
      return new ApplicationResponse('Operación fallida', false, []).GetResponse();
    }
  }

}
