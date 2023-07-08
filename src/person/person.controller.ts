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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this._personService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return await this._personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this._personService.remove(+id);
  }
}
