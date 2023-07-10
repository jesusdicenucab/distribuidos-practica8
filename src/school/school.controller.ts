import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @ApiOperation({summary: 'CREATE A SCHOOL'})
  @Post()
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.create(createSchoolDto);
  }

  @ApiOperation({summary: 'GET ALL SCHOOLS REGISTERED ON DATABASE'})
  @Get()
  findAll() {
    return this.schoolService.findAll();
  }

  @ApiOperation({summary: 'GET A SINGLE SCHOOL REGISTERED ON DATABASE'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolService.findOne(+id);
  }

  @ApiOperation({summary: 'MODIFY A SCHOOL VALUES REGISTERED ON DATABASE'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSchoolDto: UpdateSchoolDto) {
    return this.schoolService.update(+id, updateSchoolDto);
  }

  @ApiOperation({summary: 'DISABLE A SCHOOL'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schoolService.remove(+id);
  }
}
