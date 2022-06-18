import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Class } from "./class.entity";

@Entity()
export class Classroom {
  @PrimaryGeneratedColumn()
  public id?: number;

  @ManyToOne(() => Class, (className: Class) => class.allClassrooms)
  public className: Class;
}