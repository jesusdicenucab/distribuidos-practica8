import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseEntityModule } from './base-entity/base-entity.module';
import { EntityModule } from './entity/entity.module';
import { PersonModule } from './person/person.module';
import { FacultyModule } from './faculty/faculty.module';
import { SchoolModule } from './school/school.module';
import { SectionModule } from './section/section.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { Faculty } from './faculty/entities/faculty.entity';
import { School } from './school/entities/school.entity';
import { Section } from './section/entities/section.entity';
import { Enrollment } from './enrollment/entities/enrollment.entity';
import { Person } from './person/entities/person.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Faculty, School, Section, Enrollment, Person],
      synchronize: true
    }),
    BaseEntityModule,
    EntityModule,
    PersonModule,
    FacultyModule,
    SchoolModule,
    SectionModule,
    EnrollmentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
