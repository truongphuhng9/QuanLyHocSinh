import { Body, Controller, forwardRef, Get, Inject, Param, Patch, Post, Put } from "@nestjs/common";
import { Class } from "../classes/class.entity";
import ClassesService from "../classes/classes.service";
import Student from "../students/student.entity";
import StudentsService from "../students/students.service";
import FindOneParams from "../utils/findOneParams";
import Year from "../years/year.entity";
import YearsService from "../years/years.service";
import ClassroomsService from "./classrooms.service";
import { CreateClassroomContronllerDto } from "./dto/create-classroom.dto";
import { UpdateClassroomControllerDto } from "./dto/update-classroom.dto";

@Controller('classrooms')
export default class ClassroomsController {
  constructor(
    private readonly classroomsService: ClassroomsService,
    private readonly classesService: ClassesService,
    @Inject(forwardRef(() => YearsService))
    private readonly yearsService: YearsService,
    @Inject(forwardRef(() => StudentsService))
    private readonly studentsService: StudentsService
  ) {}

  @Get()
  findAllClassroom() {
    return this.classroomsService.findAllClassroom();
  }

  @Get(':id')
  findClassroomById(@Param() { id }: FindOneParams) {
    return this.classroomsService.getClassroomById(Number(id));
  } 

  @Post()
  async createClassroom(@Body() { yearId, classId, studentIds }: CreateClassroomContronllerDto) {
    const year = await this.yearsService.findYearById(Number(yearId));
    const className = await this.classesService.findClassById(Number(classId));
    const students = await this.studentsService.getStudentsByIds(studentIds.map(id => Number(id)));
    const newClassroom = await this.classroomsService.createClassroom({
      schoolYear: year,
      className: className,
      students: students
    });
    return newClassroom;
  }

  @Patch()
  async updateClassroom(@Param() id: number, @Body() {}: UpdateClassroomControllerDto) {
    const 
  }

}