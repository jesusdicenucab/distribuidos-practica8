import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { IApplicationResponse } from 'src/utils/application-response/aplication-response.interface';
import { Person } from './entities/person.entity';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('person')
export class PersonController {
  constructor(private readonly _personService: PersonService) {}

  @ApiOperation({summary: 'CREATE A NEW PERSON'})
  @ApiBody({type: CreatePersonDto})
  @Post()
  async create(@Body() createPersonDto: CreatePersonDto): Promise<IApplicationResponse<Person>> {
    return await this._personService.create(createPersonDto);
  }

  @ApiOperation({summary: 'GET ALL PERSONS ON DATABASE'})
  @Get()
  async findAll() {
    return await this._personService.findAll();
  }

  @ApiOperation({summary: 'GET A SINGLE PERSON'})
  @Get(':dni')
  async findOne(@Param('dni') dni: string) {
    return await this._personService.findOne(dni);
  }

  @ApiOperation({summary: 'MODIFY A PERSON VALUES'})
  @Patch(':dni')
  async update(@Param('dni') dni: string, @Body() updatePersonDto: UpdatePersonDto) {
    return await this._personService.update(dni, updatePersonDto);
  }

  @ApiOperation({summary: 'DISABLE A PERSON'})
  @Delete(':dni')
  async remove(@Param('dni') dni: string) {
    return await this._personService.remove(dni);
  }
}
