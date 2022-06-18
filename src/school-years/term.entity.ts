import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Year } from "./year.entity";

@Entity()
export class Term {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public term_number: number;

  @ManyToOne(() => Year, (year: Year) => year.terms)
  public schoolYear: Year;
}