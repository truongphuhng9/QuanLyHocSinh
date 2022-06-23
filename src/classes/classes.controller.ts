import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import ClassroomsService from "src/classrooms/classrooms.service";
import FindOneParams from "src/utils/findOneParams";
import ClassesService from "./classes.service";
import { CreateClassServiceDto } from "./dto/createClassDto";
import { UpdateClassServiceDto } from "./dto/updateClass.dto";

@Controller('classes')
export default class ClassesController {
  constructor(
    private readonly classesService: ClassesService,
  ) {}

  @Get()
  findAllClasses() {
    return this.classesService.findAllClass();
  }

  @Get(':id')
  findClassById(@Param() { id }: FindOneParams) {
    return this.classesService.findClassById(Number(id));
  }

  @Post()
  async createClass(@Body() { classCode }: CreateClassServiceDto) {
    return this.classesService.createClass({ classCode });
  }

  @Patch(':id')
  async updateClass(@Param() { id }: FindOneParams, @Body() { classCode }: UpdateClassServiceDto) {
    return this.classesService.updateClassCodeOnly(Number(id), { id: Number(id), classCode: classCode});
  }

  @Delete(':id')
  async deleteClass(@Param() { id }: FindOneParams) {
    return this.classesService.deleteClass(Number(id));
  }
}