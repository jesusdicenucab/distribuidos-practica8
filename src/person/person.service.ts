import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
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
      const results = await this._personRepository.find({where: {deletedDate: null}});
      return new ApplicationResponse('Persona registradas', true, results).GetResponse();
    } catch(error) {
      return new ApplicationResponse('Operación fallida', false, []).GetResponse();
    }
  }

  async findOne(dni: string): Promise<IApplicationResponse<Person>> {
    try {
      const results = await this._personRepository.find({where: {dni: dni}});
      let message = 'Persona encontrada';
      if (results.length === 0)
        message = 'La persona no fue encontrada';
      return new ApplicationResponse(message, true, results).GetResponse();
    } catch(error) {
      return new ApplicationResponse('Operación fallida', false, []).GetResponse();
    }
  }

  async update(dni: string, updatePersonDto: UpdatePersonDto): Promise<IApplicationResponse<Person>> {
    try {
      let person = await this._personRepository.find({where: {dni: dni}});
      person = {...person, ...UpdatePersonDto}
      await this._personRepository.save(person);
      return new ApplicationResponse('Persona editada correctamente', true, person).GetResponse();
    } catch(error) {
      return new ApplicationResponse('Operación fallida', false, []).GetResponse();
    }
  }

  async remove(dni: string): Promise<IApplicationResponse<Person>> {
    try {
      let person = await this._personRepository.find({where: {dni: dni}});
      // person = {...person, deletedDate: new Date()}
      await this._personRepository.save(person);
      return new ApplicationResponse('Persona eliminada correctamente', true, person).GetResponse();
    } catch(error) {
      return new ApplicationResponse('Operación fallida', false, []).GetResponse();
    }
  }
}
