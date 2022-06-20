import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Year } from "../years/year.entity";

@Entity()
export class Term {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public termNumber: number;

  @ManyToOne(() => Year, (year: Year) => year.terms)
  public schoolYear: Year;
}

export default Term;