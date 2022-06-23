import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Course {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public courseName: string;

  @Column()
  public schoolYear: number;


}

export default Course;