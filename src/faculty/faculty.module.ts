import { Module } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { FacultyController } from './faculty.controller';
import { Faculty } from './entities/faculty.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Faculty])],
  controllers: [FacultyController],
  providers: [FacultyService]
})
export class FacultyModule {}
