import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Year from "src/years/year.entity";
import { Repository } from "typeorm";
import { Class } from "../classes/class.entity";
import { Classroom } from "./classroom.entity";
import { CreateClassroomDto } from "./dto/create-classroom.dto";
import { UpdateClassroomDto } from "./dto/update-classroom.dto";
import ClassroomNotFoundException from "./exceptions/classroom-notfound.exception";

@Injectable()
export default class ClassroomsService {
  constructor(
    @InjectRepository(Classroom)
    private classroomsRepository: Repository<Classroom>,
  ) {}

  findAll() {
    return this.classroomsRepository.find({});
  }

  async getClassroomById(id: number) {
    const classroom = await this.classroomsRepository.findOne(id, { relations: ['students'] });
    if (classroom) {
      return classroom;
    }
    throw new ClassroomNotFoundException(id);
  }

  async createClassroom(year: Year, classTemplate: Class) {
    const newClassroom = await this.classroomsRepository.create({
      className: classTemplate,
      schoolYear: year,
      students: [],
    })

    await this.classroomsRepository.save(newClassroom);
    return newClassroom;
  }

  // async updateClassroom(id: number, classroom: UpdateClassroomDto) {
  //   const { year_id, class_id } = classroom;
  //   const year = await this.yearsRepository.findOne({ id: year_id });
  //   const classTemplate = await this.classesRepository.findOne({ id: class_id });
    
  //   await this.classroomsRepository.update(id, {schoolYear: year, className: classTemplate });
  //   const updatedClassroom = await this.classesRepository.findOne(id, { relations: ['student', 'schoolYear', 'className']});
  //   if (updatedClassroom) {
  //     return updatedClassroom;
  //   } 
  //   throw new ClassroomNotFoundException(id);
  // }

  // async deleteClassroom(id: number) {
  //   const deleteResponse = await this.classesRepository.delete(id);
  //   if (!deleteResponse.affected) {
  //     throw new ClassroomNotFoundException(id);
  //   }
  // }
}