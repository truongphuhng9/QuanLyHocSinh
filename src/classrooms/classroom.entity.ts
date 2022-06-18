import { Year } from "src/years/year.entity";
import Student from "src/students/student.entity";
import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Class } from "../classes/class.entity";

@Entity()
export class Classroom {
  @PrimaryGeneratedColumn()
  public id?: number;

  @ManyToOne(() => Class, (className: Class) => className.allClassrooms)
  public className: Class;

  @ManyToOne(() => Year, (schoolYear: Year) => schoolYear.openedClassrooms)
  public schoolYear: Year;

  //many2many: Student - One student can study in different classroom
  @ManyToMany(() => Student, (student: Student) => student.enrolledClassrooms)
  @JoinTable()
  public students: Student[];
}

export default Classroom;
