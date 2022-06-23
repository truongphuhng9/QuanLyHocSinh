import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentServiceDto } from './dto/create-student.dto';
import { UpdateStudentServiceDto } from './dto/update-student.dto';
import Student from './student.entity';

@Injectable()
export default class StudentsService {
  private lastStudentId = 0;
  private students: Student[] = [];

  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  getAllStudents(): Promise<Student[]> {
    return this.studentsRepository.find();
  }

  async getStudentById(id: number): Promise<Student> {
    const student = await this.studentsRepository.findOne(id, { relations: ['enrolledClassrooms']});
    if (student) {
      return student;
    }
    throw new HttpException(`Student not found!`, HttpStatus.NOT_FOUND);
  }

  async getStudentsByIds(ids: number[]) {
    const students = await this.studentsRepository.findByIds(ids);
    return students;
  }

  async updateStudent(id: number, updateStudent: UpdateStudentServiceDto): Promise<Student> {
    await this.studentsRepository.update(id, updateStudent);
    const updatedStudent = this.studentsRepository.findOne(id);
    if (updatedStudent) {
      return updatedStudent;
    }
    throw new HttpException('Student not found!', HttpStatus.NOT_FOUND);
  }

  async createStudent(student: CreateStudentServiceDto): Promise<Student> {
    const newStudent = await this.studentsRepository.create(student);
    await this.studentsRepository.save(newStudent);
    return newStudent;
  }

  async deleteStudent(id: number) {
    const deleteResponse = await this.studentsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Student not found!', HttpStatus.NOT_FOUND);
    }
  }
}
