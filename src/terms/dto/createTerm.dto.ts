import { Type } from "class-transformer"
import { IsNumber, IsString, ValidateNested } from "class-validator"
import Year from "src/years/year.entity"

export class CreateTermServiceDto {
  
  @IsNumber()
  termNumber: number

  @ValidateNested()
  @Type(() => Year)
  schoolYear: Year
}

export class CreateTermControllerDto {
  
  @IsNumber()
  termNumber: number

  @IsString()
  yearId: Year
}
