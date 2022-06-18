import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Classroom } from "./classroom.entity";

@Entity('class')
export class Class {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public class_code: string;


    @OneToMany(() => Classroom, (classroom: Classroom) => classroom.className)
    public allClassrooms: Classroom[];

}