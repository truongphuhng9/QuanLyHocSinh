import { Class } from "src/classes/class.entity";
import Student from "src/students/student.entity";

export class CreateClassroomServiceDto {
  className: string;
  schoolYear: number;
  students: Student[];
}

export class CreateClassroomContronllerDto { 
  className: string;
  schoolYear: number;
  studentIds: number[];
}