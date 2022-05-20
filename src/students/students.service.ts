import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import CreateStudentDto from './dto/create-student.dto';
import UpdateStudentDto from './dto/update-student.dto';
import { Student } from './student.interface';

@Injectable()
export default class StudentsService {
  private lastStudentId = 0;
  private students: Student[] = [];

  getAllStudents(): Student[] {
    return this.students;
  }

  getStudentById(id: number): Student {
    const student = this.students.find(student => student.id === id);
    if (student) {
      return student;
    }
    throw new HttpException(`Student not found!`, HttpStatus.NOT_FOUND);
  }

  updateStudent(id: number, updateStudent: UpdateStudentDto): Student {
    const studentIndex = this.students.findIndex(student => student.id === id);
    if (studentIndex === 1) {
      this.students[studentIndex] = updateStudent;
      return updateStudent;
    }
    throw new HttpException('Student not found!', HttpStatus.NOT_FOUND);
  }

  createStudent(student: CreateStudentDto): Student {
    const newStudent = {
      id: ++this.lastStudentId,
      ...student,
    }
    this.students.push(newStudent);
    return newStudent;
  }

  deleteStudent(id: number) {
    const studentIndex = this.students.findIndex(student => student.id === id);
    if (studentIndex > -1) {
      this.students.splice(studentIndex, 1);
    } else {
      throw new HttpException('Student not found!', HttpStatus.NOT_FOUND);
    }
  }
}
