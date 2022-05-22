import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'students' })
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
}

export default Student;