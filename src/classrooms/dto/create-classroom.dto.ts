import { Class } from "src/classes/class.entity";
import Student from "src/students/student.entity";
import Year from "src/years/year.entity";

export class CreateClassroomServiceDto {
  className: Class;
  schoolYear: Year;
  students: Student[];
}

export class CreateClassroomContronllerDto { 
  classId: string;
  yearId: string;
  studentIds: string[];
}