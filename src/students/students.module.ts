import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import StudentsController from './students.controller';
import StudentsService from './students.service';
import Student from './student.entity';
import { ClassroomsModule } from 'src/classrooms/classrooms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    forwardRef(() => ClassroomsModule)
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService]
})

export class StudentsModule {}