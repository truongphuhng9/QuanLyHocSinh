import { Type } from "class-transformer"
import { IsNumber, IsString, ValidateNested } from "class-validator"
import Year from "src/years/year.entity"

export class UpdateTermServiceDto {
  @IsNumber()
  id: number

  @IsNumber()
  termNumber: number

  @ValidateNested()
  @Type(() => Year)
  schoolYear: Year
}

export class UpdateTermControllerDto {
  @IsString()
  id: string

  @IsString()
  termNumber: string

  @IsString()
  yearId: string
}

