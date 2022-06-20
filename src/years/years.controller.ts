import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import TermsService from "src/terms/terms.service";
import FindOneParams from "src/utils/findOneParams";
import { CreateYearControllerDto } from "./dto/createYear.dto";
import YearService from "./years.service";

@Controller('years')
export default class YearsController {
  constructor(
    private readonly yearsService: YearService,
    private readonly ternsService: TermsService,
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
    const 
  }
}