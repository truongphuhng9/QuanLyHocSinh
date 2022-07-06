import Student from "../students/student.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import GradeRecord from "../grade-records/gradeRecord.entity";

@Entity()
export class Classroom {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public className: string;

  @Column()
  public schoolYear: number;

  //many2many: Student - One student can study in different classroom
  @ManyToMany(() => Student, (student: Student) => student.enrolledClassrooms)
  @JoinTable()
  public students: Student[];

  @OneToMany(() => GradeRecord, (record: GradeRecord) => record.classroom)
  public gradeRecords: GradeRecord[];
}

export default Classroom;
