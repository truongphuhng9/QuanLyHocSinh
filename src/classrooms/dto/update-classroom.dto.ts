import { Class } from "src/classes/class.entity";
import Student from "src/students/student.entity";
import Year from "src/years/year.entity";

export class UpdateClassroomControllerDto {
  className: string;
  yearId: number;
}

export class UpdateClassroomServiceDto {
  className: string;
  schoolYear: Year;
  students: Student[];
}
