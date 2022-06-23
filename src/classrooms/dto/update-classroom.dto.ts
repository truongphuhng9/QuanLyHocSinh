import { Class } from "src/classes/class.entity";
import Student from "src/students/student.entity";
import Year from "src/years/year.entity";

export class UpdateClassroomControllerDto {
  id: number
  className: string;
  schoolYear: number;
  studentIds: number[];
}

export class UpdateClassroomServiceDto {
  id: number
  className: string;
  schoolYear: number;
  students: Student[];
}
