import { Module, forwardRef } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { School } from './entities/school.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionModule } from '../section/section.module';
import { FacultyModule } from 'src/faculty/faculty.module';

@Module({
  imports: [TypeOrmModule.forFeature([School]), SectionModule, forwardRef(() =>FacultyModule)],
  controllers: [SchoolController],
  providers: [SchoolService],
  exports: [SchoolService]
})
export class SchoolModule {}
