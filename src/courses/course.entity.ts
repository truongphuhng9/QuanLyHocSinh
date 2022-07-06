import GradeRecord from "../grade-records/gradeRecord.entity";
import Student from "../students/student.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Course {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public courseName: string;

  @Column()
  public schoolYear: number;

  @ManyToMany(() => Student, (student: Student) => student.enrolledCourses)
  public students: Student[];

  @OneToMany(() => GradeRecord, record => record.course)
  public gradeRecords: GradeRecord[];
}

export default Course;