import Classroom from "src/classrooms/classroom.entity";

export class UpdateStudentServiceDto {
  student_code: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  date_of_birth: Date;
  sex: string;
  enrolledClassrooms: Classroom[];
}

export class UpdateStudentControllerDto {
  student_code: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  date_of_birth: Date;
  sex: string;
  enrolledClassroomIds: number[]
}