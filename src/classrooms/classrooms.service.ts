import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Classroom } from "./classroom.entity";
import ClassroomNotFoundException from "./exceptions/classroom-notfound.exception";

@Injectable()
export default class ClassroomsService {
  constructor(
    @InjectRepository(Classroom)
    private classroomsRepository: Repository<Classroom>
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

  async createClassroom(classroom: CreateClassroomDto) {

  }
}