import { Type } from "class-transformer"
import { IsNumber, IsNumberString, IsString, ValidateNested } from "class-validator"
import Year from "src/years/year.entity"

export class CreateTermServiceDto {
  
  @IsNumber()
  termNumber: number

  @ValidateNested()
  @Type(() => Year)
  schoolYear: Year
}

export class CreateTermControllerDto {
  
  @IsNumberString()
  termNumber: string

  @IsString()
  yearId: string
}
