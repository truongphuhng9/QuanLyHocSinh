import { Body, Controller, Delete, forwardRef, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import ClassroomsService from "src/classrooms/classrooms.service";
import TermsService from "src/terms/terms.service";
import FindOneParams from "src/utils/findOneParams";
import { CreateYearControllerDto } from "./dto/createYear.dto";
import { UpdateYearControllerDto } from "./dto/updateYear.dto";
import YearsService from "./years.service";

@Controller('years')
export default class YearsController {
  constructor(
    private readonly yearsService: YearsService,
    @Inject(forwardRef(() => TermsService))
    private readonly termsService: TermsService,
    @Inject(forwardRef(() => ClassroomsService))
    private readonly classroomService: ClassroomsService
  ) {}

  @Get()
  findAllYears() {
    return this.yearsService.findAllYear();
  }

  @Get(':id')
  findYearById(@Param() { id }: FindOneParams) {
    return this.yearsService.findYearById(Number(id));
  }

  @Post()
  async createYear(@Body() { year, termIds, openedClassIds }: CreateYearControllerDto) {
    const terms = await this.termsService.findTermByIds(termIds.map(id=> Number(id)));
    const openedClassrooms = await this.classroomService.getClassroomsByIds(openedClassIds.map(id=> Number(id)))

    return this.yearsService.createYear({
      year: Number(year),
      terms: terms,
      openedClassrooms: openedClassrooms
    })
  }

  @Patch(':id')
  async updateYear(@Param() { id }: FindOneParams, @Body() { year, termIds, openedClassIds }: UpdateYearControllerDto) {
    const terms = await this.termsService.findTermByIds(termIds.map(id=> Number(id)));
    const openedClassrooms = await this.classroomService.getClassroomsByIds(openedClassIds.map(id=> Number(id)))
  
    return this.yearsService.updateYear(Number(id), {
      id: Number(id),
      year: Number(year),
      terms: terms,
      openedClassrooms: openedClassrooms
    });
  }

  @Delete(':id')
  async deleteYear(@Param() { id }: FindOneParams) {
    return this.yearsService.deleteYear(Number(id));
  }
}