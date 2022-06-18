import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Classroom } from "./classroom.entity";

@Injectable()
export default class ClassroomsService {
  constructor(
    @InjectRepository(Classroom)
    private classroomsRepository: Repository<Classroom>
  ) {}

  findAll() {
    return this.classroomsRepository.find({ relations: });
  }


}