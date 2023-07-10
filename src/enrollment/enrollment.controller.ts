import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { EnrollmentType } from 'src/types/types';

@Controller('enrollment')
export class EnrollmentController {

  constructor(private readonly _enrollmentService: EnrollmentService) {}

  @ApiOperation({summary: 'CREATE AN ENROLLMENT'})
  @ApiBody({type: CreateEnrollmentDto})
  @Post()
  async create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return await this._enrollmentService.create(createEnrollmentDto);
  }

  @ApiOperation({summary: 'GET ALL ENROLLMENTS REGISTERED IN DATABASE'})
  @Get()
  async findAll() {
    return await this._enrollmentService.findAll();
  }

  @ApiOperation({summary: 'GET A SINGLE ENROLLMENT REGISTERED IN DATABASE'})
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this._enrollmentService.findOne(+id);
  }

  @ApiOperation({summary: 'MODIFY AN ENROLLMENT VALUES'})
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEnrollmentDto: UpdateEnrollmentDto) {
    return await this._enrollmentService.update(+id, updateEnrollmentDto);
  }

  @ApiOperation({summary: 'DISABLE AN ENROLLMENT'})
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this._enrollmentService.remove(+id);
  }

  @ApiOperation({summary: 'LIST TEACHERS OR STUDENTS OF A SECTION'})
  @ApiParam({name: 'sectionId', type: 'string'})
  @ApiParam({name: 'type', type: 'EnrollmentType: student or teacher'})
  @Get(':sectionId/:type')
  async personsByTypeAndSection(@Param('sectionId') sectionId: string, @Param('type') type: EnrollmentType) {
    return await this._enrollmentService.getPersonsByTypeAndSection(+sectionId, type);
  }

}
