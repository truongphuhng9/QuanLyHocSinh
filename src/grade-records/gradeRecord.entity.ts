import Classroom from "../classrooms/classroom.entity";
import Course from "../courses/course.entity";
import Student from "../students/student.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class GradeRecord {
  @PrimaryGeneratedColumn()
  id: number

  @Column() 
  term: number

  @Column() 
  year: number

  @ManyToOne(() => Student, student => student.gradeRecords)
  student: Student

  @ManyToOne(() => Course, course => course.gradeRecords)
  course: Course

  @ManyToOne(() => Classroom, classroom => classroom.gradeRecords)
  classroom: Classroom

  @Column()
  _15mTest: number 

  @Column() 
  lessionTest: number 

  @Column()
  finalTest: number

}

export default GradeRecord;