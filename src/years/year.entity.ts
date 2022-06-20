import Classroom from "src/classrooms/classroom.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Term } from "../terms/term.entity";

@Entity()
export class Year {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public year: number;

  @OneToMany(() => Term, (term: Term) => term.schoolYear)
  public terms: Term[];

  @OneToMany(() => Classroom, (classroom: Classroom) => classroom.schoolYear)
  public openedClassrooms: Classroom[];
}

export default Year;