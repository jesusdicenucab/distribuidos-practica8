import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @ApiOperation({summary: 'CREATE A SECTION'})
  @Post()
  async create(@Body() createSectionDto: CreateSectionDto) {
    return await this.sectionService.create(createSectionDto);
  }

  @ApiOperation({summary: 'GET ALL SECTIONS REGISTERED ON DATABASE'})
  @Get()
  async findAll() {
    return await this.sectionService.findAll();
  }

  @ApiOperation({summary: 'GET A SINGLE SECTION REGISTERED ON DATABASE'})
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.sectionService.findOne(+id);
  }

  @ApiOperation({summary: 'MODIFY A SCHOOL VALUES'})
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSectionDto: UpdateSectionDto) {
    return await this.sectionService.update(+id, updateSectionDto);
  }

  @ApiOperation({summary: 'DISABLE A SECTION'})
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.sectionService.remove(+id);
  }
}
