import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { PersonModule } from 'src/person/person.module';
import { SectionModule } from 'src/section/section.module';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment]), PersonModule, SectionModule],
  controllers: [EnrollmentController],
  providers: [EnrollmentService]
})
export class EnrollmentModule {}
