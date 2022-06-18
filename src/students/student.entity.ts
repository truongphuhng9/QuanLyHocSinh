import Classroom from 'src/classrooms/classroom.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Student {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    student_code: string;

    @Column() 
    public first_name: string;

    @Column()
    public last_name: string;

    @Column()
    public email: string;
    
    @Column()
    public address: string;
    
    @Column()
    public date_of_birth: Date;
    
    @Column()
    public sex: string;

    @ManyToMany(() => Classroom, (classroom: Classroom) => classroom.students)
    public enrolledClassrooms: Classroom[];
}


export default Student;