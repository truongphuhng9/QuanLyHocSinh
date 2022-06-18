import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import StudentsService from './students.service';
import CreateStudentDto from './dto/create-student.dto';
import UpdateStudentDto from './dto/update-student.dto';
import { ListAllStudents } from './dto/list-all-student.dto';
import JwtAuthGuard from 'src/authentication/jwt-authentication.guard';

@Controller('students')
export default class StudentsController {
  constructor(
    private readonly studentsService: StudentsService
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() query: ListAllStudents) {
    return this.studentsService.getAllStudents();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getStudentById(@Param('id') id: string) {
    return this.studentsService.getStudentById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createStudent(@Body() student: CreateStudentDto) {
    return this.studentsService.createStudent(student);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateStudent(@Param('id') id: string, @Body() student: UpdateStudentDto) {
    return this.studentsService.updateStudent(Number(id), student);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteStudent(@Param('id') id: string) {
    return this.studentsService.deleteStudent(Number(id));
  }
}