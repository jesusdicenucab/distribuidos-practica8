import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from './entities/section.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SectionService {

  constructor(
    @InjectRepository(Section)
    private readonly _sectionRepository: Repository<Section>
  ){}

  create(createSectionDto: CreateSectionDto) {
    return 'This action adds a new section';
  }

  findAll() {
    return `This action returns all section`;
  }

  findOne(id: number) {
    return `This action returns a #${id} section`;
  }

  update(id: number, updateSectionDto: UpdateSectionDto) {
    return `This action updates a #${id} section`;
  }

  remove(id: number) {
    return `This action removes a #${id} section`;
  }
}
