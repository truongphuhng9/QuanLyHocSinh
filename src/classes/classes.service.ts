import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Class } from "./class.entity";
import { CreateClassServiceDto } from "./dto/createClassDto";
import { UpdateClassServiceDto } from "./dto/updateClass.dto";

@Injectable()
export default class ClassesService {
  constructor(
    @InjectRepository(Class)
    private readonly classesRepository: Repository<Class>
  ) {}

  findAllClass() {
    return this.classesRepository.find();
  }

  findClassById(id: number) {
    return this.classesRepository.findOne(id);
  }

  async createClass({ classCode }: CreateClassServiceDto) {
    // New class template, so do not have any of classroom
    const newClass = await this.classesRepository.create({
      classCode: classCode,
      allClassrooms: []
    });
    await this.classesRepository.save(newClass);
    return newClass;
  }

  async updateClassCodeOnly(id: number, { classCode }: UpdateClassServiceDto) { 
    await this.classesRepository.update(id, {
      ...{classCode: classCode}
    })
  }

  async deleteClass(id: number) {
    const deleteResponse = await this.classesRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException(`Not found class with id ${id}`, HttpStatus.NOT_FOUND);
    }
  }
}