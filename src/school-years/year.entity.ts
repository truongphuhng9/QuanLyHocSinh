import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Term } from "./term.entity";

@Entity()
export class Year {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public year: number;

  @OneToMany(() => Term, (term: Term) => term.schoolYear)
  public terms: Term[];
}