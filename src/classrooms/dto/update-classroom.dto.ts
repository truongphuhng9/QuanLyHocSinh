import { Class } from "src/classes/class.entity";
import Student from "src/students/student.entity";
import Year from "src/years/year.entity";

export class UpdateClassroomControllerDto {
  class_id: number;
  year_id: number;
}

export class UpdateClassroomServiceDto {
  className: Class;
  schoolYear: Year;
  students: Student[];
}
