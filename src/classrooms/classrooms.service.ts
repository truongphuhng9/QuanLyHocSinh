import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Classroom } from "./classroom.entity";
import { CreateClassroomServiceDto } from "./dto/create-classroom.dto";
import { UpdateClassroomServiceDto } from "./dto/update-classroom.dto";
import ClassroomNotFoundException from "./exceptions/classroom-notfound.exception";

@Injectable()
export default class ClassroomsService {
  constructor(
    @InjectRepository(Classroom)
    private classroomsRepository: Repository<Classroom>,
  ) {}

  findAllClassroom() {
    return this.classroomsRepository.find({});
  }

  async getClassroomById(id: number) {
    const classroom = await this.classroomsRepository.findOne(id, { relations: ['students'] });
    if (classroom) {
      return classroom;
    }
    throw new ClassroomNotFoundException(id);
  }

  async getClassroomsByIds(ids: number[]) {
    return await this.classroomsRepository.findByIds(ids, { relations: ['students']});
  }

  async createClassroom(classroom: CreateClassroomServiceDto) {
    const newClassroom = await this.classroomsRepository.create({
      ...classroom
    })

    await this.classroomsRepository.save(newClassroom);
    return newClassroom;
  }

  async updateClassroom(id: number, classroom: UpdateClassroomServiceDto) { 
    await this.classroomsRepository.update(id, classroom);
    const updatedClassroom = await this.classroomsRepository.findOne(id);
    if (updatedClassroom) { 
      return updatedClassroom;
    }
  }

  async deleteClassroom(id: number) {
    const deleteResponse = await this.classroomsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new ClassroomNotFoundException(id);
    }
  }
}