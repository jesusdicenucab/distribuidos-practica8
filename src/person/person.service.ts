import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { IsNull, Repository } from 'typeorm';
import { IApplicationResponse } from '../utils/application-response/aplication-response.interface';
import { ApplicationResponse } from '../utils/application-response/application-response.util';

@Injectable()
export class PersonService {

  constructor(
    @InjectRepository(Person)
    private readonly _personRepository: Repository<Person>
  ){}

  async create(createPersonDto: CreatePersonDto): Promise<IApplicationResponse<Person>> {
    try {
      const newPerson = {...createPersonDto}
      await this._personRepository.save(newPerson);
      return new ApplicationResponse('Persona registrada satisfactoriamente', true, []).GetResponse();
    } catch(error) {
      return new ApplicationResponse('No se logró registrar a la persona', false, []).GetResponse();
    }
  }

  async findAll(): Promise<IApplicationResponse<Person>> {
    try {
      const results = await this._personRepository.find({where: {status: 'enabled', deletedDate: IsNull()}});
      if (results.length === 0)
        return new ApplicationResponse('No ha personas registradas', false, []).GetResponse();
      return new ApplicationResponse('Persona registradas', true, results).GetResponse();
    } catch(error) {
      return new ApplicationResponse('Operación fallida', false, []).GetResponse();
    }
  }

  async findOne(dni: string): Promise<IApplicationResponse<Person>> {
    try {
      const result = await this._personRepository.findOne({where: {status: 'enabled', deletedDate: IsNull(), dni: dni}});
      if (result === null)
        return new ApplicationResponse('Persona no registrada', false, []).GetResponse();
      return new ApplicationResponse('Persona registrada', true, [result]).GetResponse();
    } catch(error) {
      return new ApplicationResponse('Operación fallida', false, []).GetResponse();
    }
  }

  async update(dni: string, updatePersonDto: UpdatePersonDto): Promise<IApplicationResponse<Person>> {
    try {
      let person = await this._personRepository.findOne({where: {dni: dni}});
      if (person === null)
        return new ApplicationResponse('Persona no registrada', true, []).GetResponse();
      person = {...person, ...updatePersonDto}
      await this._personRepository.save(person);
      return new ApplicationResponse('Persona editada correctamente', true, [person]).GetResponse();
    } catch(error) {
      return new ApplicationResponse('Operación fallida', false, []).GetResponse();
    }
  }

  async remove(dni: string): Promise<IApplicationResponse<Person>> {
    try {
      let person = await this._personRepository.findOne({where: {dni: dni}});
      if (person === null)
        return new ApplicationResponse('Persona no registrada', false, []).GetResponse();
      person = {...person, status: 'disabled', deletedDate: new Date()}
      await this._personRepository.save(person);
      return new ApplicationResponse('Persona eliminada correctamente', true, [person]).GetResponse();
    } catch(error) {
      return new ApplicationResponse('Operación fallida', false, []).GetResponse();
    }
  }
}
