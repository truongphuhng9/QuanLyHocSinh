import { Body, Controller, Delete, forwardRef, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import FindOneParams from "src/utils/findOneParams";
import YearsService from "src/years/years.service";
import { CreateTermControllerDto } from "./dto/createTerm.dto";
import { UpdateTermControllerDto } from "./dto/updateTerm.dto";
import TermsService from "./terms.service";

@Controller('terms')
export default class TermsController {
  constructor(
    private readonly termsService: TermsService,
    @Inject(forwardRef(() => YearsService))
    private readonly yearsService: YearsService
  ) {}

  @Get()
  findAllTerm() {
    return this.termsService.findAllTerm();
  }

  @Get(':id')
  findTermById(@Param('id') id: string) {
    return this.termsService.findTermById(Number(id));
  }

  @Post()
  async createTerm(@Body() { termNumber, yearId }: CreateTermControllerDto) {
    const year = await this.yearsService.findYearById(Number(yearId));
    return this.termsService.createTerm({
      termNumber: Number(termNumber),
      schoolYear: year
    });
  }

  @Patch(':id')
  async updateTerm(@Param() { id }: FindOneParams, @Body() { termNumber, yearId }: UpdateTermControllerDto) {
    const year = await this.yearsService.findYearById(Number(yearId));
    return this.termsService.updateTerm(Number(id), {
      id: Number(id),
      termNumber: Number(termNumber),
      schoolYear: year
    });
  }

  @Delete(':id')
  async deleteCategory(@Param() { id }: FindOneParams) {
    return this.termsService.deleteTerm(Number(id));
  }
}