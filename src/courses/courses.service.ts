import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Course from "./course.entity";
import { CreateCourseDto } from "./dto/createCourse.dto";

@Injectable()
export default class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>
  ) {}

  findAllCourses() {
    return this.coursesRepository.find();
  }

  findCourseById(id: number) {
    return this.coursesRepository.findOne(id);
  }

  async createCourse(course: CreateCourseDto) {
    const newCourse = this.coursesRepository.create({...course});
    await this.coursesRepository.save(newCourse);

    return newCourse;
  }

  async updateCourse(id: number, course: CreateCourseDto) {
    await this.coursesRepository.update(id, {...course});
    const updatedCourse = this.coursesRepository.findOne(id);
    if (updatedCourse) {
      return updatedCourse;
    }
  }

  async deleteCourse(id: number) {
    const deleteResponse = await this.coursesRepository.delete(id);
    if (!deleteResponse.affected) { 
      throw new HttpException('Not found', HttpStatus.NOT_FOUND); 
    } 
  }
}
