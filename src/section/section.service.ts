import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from './entities/section.entity';
import { IsNull, Repository } from 'typeorm';
import { IApplicationResponse } from 'src/utils/application-response/aplication-response.interface';
import { ApplicationResponse } from 'src/utils/application-response/application-response.util';

@Injectable()
export class SectionService {

  constructor(
    @InjectRepository(Section)
    private readonly _sectionRepository: Repository<Section>
  ){}

  async create(createSectionDto: CreateSectionDto): Promise<IApplicationResponse<Section>> {
    try {
      const newSection = {...createSectionDto}
      await this._sectionRepository.save(newSection);
      return new ApplicationResponse('Sección registrada satisfactoriamente', true, []).GetResponse();
    } catch(error) {
      return new ApplicationResponse('No se logró registrar la sección', false, []).GetResponse();
    }
  }

  async findAll(): Promise<IApplicationResponse<Section>> {
    try {
      const results = await this._sectionRepository.find({where: {status: 'enabled', deletedDate: IsNull()}});
      if (results.length === 0)
        return new ApplicationResponse('No hay secciones registradas', false, []).GetResponse();
      return new ApplicationResponse('Secciones registradas', true, results).GetResponse();
    } catch(error) {
      return new ApplicationResponse('Operación fallida', false, []).GetResponse();
    }
  }

  async findOne(id: number): Promise<IApplicationResponse<Section>> {
    try {
      const result = await this._sectionRepository.findOne({where: {status: 'enabled', deletedDate: IsNull(), id: id}});
      if (result === null)
        return new ApplicationResponse('Sección no registrada', false, []).GetResponse();
      return new ApplicationResponse('Sección registrada', true, [result]).GetResponse();
    } catch(error) {
      return new ApplicationResponse('Operación fallida', false, []).GetResponse();
    }
  }

  async update(id: number, updateSectionDto: UpdateSectionDto): Promise<IApplicationResponse<Section>> {
    try {
      let section = await this._sectionRepository.findOne({where: {id: id}});
      if (section === null)
        return new ApplicationResponse('Sección no registrada', true, []).GetResponse();
      section = {...section, ...updateSectionDto}
      await this._sectionRepository.save(section);
      return new ApplicationResponse('Sección editada correctamente', true, [section]).GetResponse();
    } catch(error) {
      return new ApplicationResponse('Operación fallida', false, []).GetResponse();
    }
  }

  async remove(id: number): Promise<IApplicationResponse<Section>> {
    try {
      let section = await this._sectionRepository.findOne({where: {id: id}});
      if (section === null)
        return new ApplicationResponse('Sección no registrada', false, []).GetResponse();
      section = {...section, status: 'disabled', deletedDate: new Date()}
      await this._sectionRepository.save(section);
      return new ApplicationResponse('Sección eliminada correctamente', true, [section]).GetResponse();
    } catch(error) {
      return new ApplicationResponse('Operación fallida', false, []).GetResponse();
    }
  }
}
