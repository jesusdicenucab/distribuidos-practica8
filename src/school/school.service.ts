import { Injectable } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from './entities/school.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SchoolService {

  constructor(
    @InjectRepository(School)
    private readonly _schoolRepository: Repository<School>
  ){}

  create(createSchoolDto: CreateSchoolDto) {
    return 'This action adds a new school';
  }

  findAll() {
    return `This action returns all school`;
  }

  findOne(id: number) {
    return `This action returns a #${id} school`;
  }

  update(id: number, updateSchoolDto: UpdateSchoolDto) {
    return `This action updates a #${id} school`;
  }

  remove(id: number) {
    return `This action removes a #${id} school`;
  }
}
