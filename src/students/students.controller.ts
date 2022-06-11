import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import StudentsService from './students.service';
import CreateStudentDto from './dto/create-student.dto';
import UpdateStudentDto from './dto/update-student.dto';
import { ListAllStudents } from './dto/list-all-student.dto';

@Controller('students')
export default class StudentsController {
  constructor(
    private readonly studentsService: StudentsService
  ) {}

  @Get()
  findAll(@Query() query: ListAllStudents) {
    return this.studentsService.getAllStudents();
  }

  @Get(':id')
  getStudentById(@Param('id') id: string) {
    return this.studentsService.getStudentById(Number(id));
  }

  @Post()
  async createStudent(@Body() student: CreateStudentDto) {
    return this.studentsService.createStudent(student);
  }

  @Put(':id')
  async updateStudent(@Param('id') id: string, @Body() student: UpdateStudentDto) {
    return this.studentsService.updateStudent(Number(id), student);
  }

  @Delete(':id')
  async deleteStudent(@Param('id') id: string) {
    return this.studentsService.deleteStudent(Number(id));
  }
}