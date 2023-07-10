import { Module, forwardRef } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { FacultyController } from './faculty.controller';
import { Faculty } from './entities/faculty.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolModule } from 'src/school/school.module';

@Module({
  imports: [TypeOrmModule.forFeature([Faculty]), forwardRef(() => SchoolModule)],
  controllers: [FacultyController],
  providers: [FacultyService],
  exports: [FacultyService]
})
export class FacultyModule {}
