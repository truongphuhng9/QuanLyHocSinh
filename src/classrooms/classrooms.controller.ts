import { Controller, Get } from "@nestjs/common";

@Controller('classrooms')
export default class ClassroomsController {
  constructor(
    private readonly classroomsService: ClassroomsService
  ) {}

  @Get()
  findAll() {
    return this.
  }
}