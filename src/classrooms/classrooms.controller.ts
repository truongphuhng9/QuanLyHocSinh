import { Controller, Get } from "@nestjs/common";
import ClassroomsService from "./classrooms.service";

@Controller('classrooms')
export default class ClassroomsController {
  constructor(
    private readonly classroomsService: ClassroomsService
  ) {}

  @Get()
  findAll() {
    return this.classroomsService.findAll();
  }
}