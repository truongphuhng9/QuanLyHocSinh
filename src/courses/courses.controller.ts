import { Get, Post, Patch, Delete ,Controller, Param, Body } from "@nestjs/common";
import FindOneParams from "src/utils/findOneParams";
import CoursesService from "./courses.service";
import { CreateCourseDto } from "./dto/createCourse.dto";

@Controller('courses')
export default class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
  ) {}

  @Get()
  findAllCourses() {
    return this.coursesService.findAllCourses();
  }

  @Get(':id')
  findCourseById(@Param() { id }: FindOneParams) {
    return this.coursesService.findCourseById(Number(id));
  }

  @Post()
  async createCourse(@Body() course: CreateCourseDto) {
    return this.coursesService.createCourse(course);
  }

  @Patch(':id')
  async updateCourse(@Param() id: number, @Body() course: CreateCourseDto) {
    return this.coursesService.updateCourse(id, course);
  }

  @Delete(':id')
  async deleteCourse(@Param() id: number) { 
    return this.coursesService.deleteCourse(id);
  }
}