import { Get, Body, Post, Patch, Delete, Param, Controller, Inject, forwardRef, Query } from "@nestjs/common";
import ClassroomsService from "src/classrooms/classrooms.service";
import CoursesService from "src/courses/courses.service";
import StudentsService from "src/students/students.service";
import GradeRecordsFilterQuery from "src/utils/gradeRecordsFilterQuery";
import { CreateGradeRecordControllerDto } from "./dto/createGradeRecord.dto";
import { UpdateGradeRecordControllerDto } from "./dto/updateGradeRecord.dto";
import GradeRecordsService from "./gradeRecords.service";

@Controller('grade-record')
export default class GradeRecordsController {
  constructor(
    private readonly gradeRecordsService: GradeRecordsService,
    @Inject(forwardRef(() => StudentsService))
    private readonly studentsService: StudentsService,
    @Inject(forwardRef(() => ClassroomsService))
    private readonly classroomsService: ClassroomsService,
    @Inject(forwardRef(() => CoursesService))
    private readonly coursesService: CoursesService,
  ) {}
  
  @Get()
  findAllGradeRecord(@Query() query: GradeRecordsFilterQuery) {
    if (query) {
      return this.gradeRecordsService.findGradeRecordByCourse(query);
    }
    return this.gradeRecordsService.findAllGradeRecord();
  }

  @Get(':id')
  findGradeRecordById(@Param() id: number) {
    return this.gradeRecordsService.findGradeRecordById(id);
  }

  @Post()
  async createGradeRecord(@Body() record: CreateGradeRecordControllerDto) {
    const student = await this.studentsService.getStudentById(record.studentId);
    const classroom = await this.classroomsService.getClassroomById(record.classroomId);
    const course = await this.coursesService.getCourseById(record.courseId);

    return this.gradeRecordsService.createGradeRecord({
      ...record,
      student: student,
      classroom: classroom,
      course: course
    });
  }

  @Patch(':id')
  async updateGradeRecord(@Param('id') id: number, @Body() record: UpdateGradeRecordControllerDto) {
    return this.gradeRecordsService.updateGradeRecord(id, {
      ...record
    })
  }

  @Delete(':id')
  async deleteGradeRecord(@Param('id') id: number) {
    return this.gradeRecordsService.deleteGradeRecord(id);
  }
}