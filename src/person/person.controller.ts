import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { IApplicationResponse } from 'src/utils/application-response/aplication-response.interface';
import { Person } from './entities/person.entity';

@Controller('person')
export class PersonController {
  constructor(private readonly _personService: PersonService) {}

  @Post()
  async create(@Body() createPersonDto: CreatePersonDto): Promise<IApplicationResponse<Person>> {
    return await this._personService.create(createPersonDto);
  }

  @Get()
  async findAll() {
    return await this._personService.findAll();
  }

  @Get(':dni')
  async findOne(@Param('dni') dni: string) {
    return await this._personService.findOne(dni);
  }

  @Patch(':dni')
  async update(@Param('dni') dni: string, @Body() updatePersonDto: UpdatePersonDto) {
    return await this._personService.update(dni, updatePersonDto);
  }

  @Delete(':dni')
  async remove(@Param('dni') dni: string) {
    return await this._personService.remove(dni);
  }
}
