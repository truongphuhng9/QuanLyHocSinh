import Classroom from "src/classrooms/classroom.entity";
import Course from "src/courses/course.entity";
import GradeRecord from "src/grade-records/gradeRecord.entity";

export class CreateStudentServiceDto {
  student_code: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  date_of_birth: Date;
  sex: string;
  enrolledClassrooms: Classroom[];
  enrolledCourses: Course[];
  gradeRecords: GradeRecord[];
}

export class CreateStudentControllerDto {
  student_code: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  date_of_birth: Date;
  sex: string;
}