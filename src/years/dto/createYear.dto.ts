import { Type } from "class-transformer"
import { IsArray, IsNumberString, ValidateNested } from "class-validator"
import Classroom from "src/classrooms/classroom.entity"
import Term from "src/terms/term.entity"

export class CreateYearServiceDto {
  year: number

  @ValidateNested()
  @IsArray()
  @Type(() => Term)
  terms: Term[]

  @ValidateNested()
  @IsArray()
  @Type(() => Classroom)
  openedClasses: Classroom[]
}

export class CreateYearControllerDto {
  year: number

  @IsArray()
  termIds: string[]

  @IsArray()
  openedClassIds: string[]
}