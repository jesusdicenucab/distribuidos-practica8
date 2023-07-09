import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';

@Controller('enrollment')
export class EnrollmentController {

  constructor(private readonly _enrollmentService: EnrollmentService) {}

  @Post()
  async create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return await this._enrollmentService.create(createEnrollmentDto);
  }

  @Get()
  async findAll() {
    return await this._enrollmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this._enrollmentService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEnrollmentDto: UpdateEnrollmentDto) {
    return await this._enrollmentService.update(+id, updateEnrollmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this._enrollmentService.remove(+id);
  }

  @Get(':sectionId/:type')
  async personsByTypeAndSection(@Param('sectionId') sectionId: string, @Param('type') type) {
    return await this._enrollmentService.getPersonsByTypeAndSection(+sectionId, type);
  }

}
