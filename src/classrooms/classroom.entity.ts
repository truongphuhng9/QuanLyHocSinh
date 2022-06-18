import Student from "src/students/student.entity";
import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Class } from "./class.entity";

@Entity()
export class Classroom {
  @PrimaryGeneratedColumn()
  public id?: number;

  @ManyToOne(() => Class, (className: Class) => className.allClassrooms)
  public className: Class;

  //many2many: Student - One student can study in different classroom
  @ManyToMany(() => Student, (student: Student) => student.enrolledClassrooms)
  @JoinTable()
  public students: Student[];
}

export default Classroom;
