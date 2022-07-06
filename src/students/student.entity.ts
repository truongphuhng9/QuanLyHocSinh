import Classroom from '../classrooms/classroom.entity';
import Course from '../courses/course.entity';
import GradeRecord from '../grade-records/gradeRecord.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Student {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public student_code: string;

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

    @ManyToMany(() => Course, (course: Course) => course.students) 
    public enrolledCourses: Course[];

    public gradeRecords: GradeRecord[];
}


export default Student;