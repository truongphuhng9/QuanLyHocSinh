import Classroom from "src/classrooms/classroom.entity";
import Course from "src/courses/course.entity";
import Student from "src/students/student.entity";

export class CreateGradeRecordServiceDto {
  year: number
  term: number
  student: Student
  course: Course
  classroom: Classroom
  _15mTest: number
  lessionTest: number
  finalTest: number 
}

export class CreateGradeRecordControllerDto {
  year: number
  term: number
  studentId: number
  courseId: number
  classroomId: number
  _15mTest: number
  lessionTest: number
  finalTest: number 
}