import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { QueryFailedError, Repository } from 'typeorm';
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

  findAll() {
    return `This action returns all person`;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
