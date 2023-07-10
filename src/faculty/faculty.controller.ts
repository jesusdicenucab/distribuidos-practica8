import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @ApiOperation({summary: 'CREATE A FACULTY'})
  @Post()
  create(@Body() createFacultyDto: CreateFacultyDto) {
    return this.facultyService.create(createFacultyDto);
  }

  @ApiOperation({summary: 'GET ALL FACULTIES REGISTERED ON DATABASE'})
  @Get()
  findAll() {
    return this.facultyService.findAll();
  }

  @ApiOperation({summary: 'GET A SINGLE FACULTY REGISTERED ON DATABASE'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facultyService.findOne(+id);
  }

  @ApiOperation({summary: 'MODIFY A FACULTY VALUE REGISTERED ON DATABASE'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFacultyDto: UpdateFacultyDto) {
    return this.facultyService.update(+id, updateFacultyDto);
  }

  @ApiOperation({summary: 'DISABLE A FACULTY REGISTERED ON DATABASE'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facultyService.remove(+id);
  }
}
