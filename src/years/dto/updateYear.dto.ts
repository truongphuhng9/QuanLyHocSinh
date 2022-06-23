import { Type } from "class-transformer"
import { IsArray, IsNumber, IsNumberString, ValidateNested } from "class-validator"
import Classroom from "src/classrooms/classroom.entity"
import Term from "src/terms/term.entity"

export class UpdateYearServiceDto {
  @IsNumber()
  id: number

  @IsNumber()
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

export class UpdateYearControllerDto {
  @IsNumberString()
  year: string

  @IsArray()
  termIds: string[]

  @IsArray()
  openedClassIds: string[]
}