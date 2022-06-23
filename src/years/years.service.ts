import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Year from "./year.entity";

@Injectable() 
export default class YearsService {
  constructor(
    @InjectRepository(Year)
    private readonly yearsRepository: Repository<Year>
  ) {}

  findAllYear() {
    return this.yearsRepository.find();
  }

  findYearById(id: number) {
    return this.yearsRepository.findOne(id);
  }

  async createYear(year: Year) {
    const newYear = await this.yearsRepository.create(year);
    await this.yearsRepository.save(newYear);
    return newYear;
  }

  async updateYear(id: number, year: Year) {
    await this.yearsRepository.update(id, year);
    const updatedYear = await this.yearsRepository.findOne(id);
    if (updatedYear) {
      return updatedYear;
    }
  }

  async deleteYear(id: number) {
    const deleteResponse = await this.yearsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException(`Year with ${id} does not exists`, HttpStatus.NOT_FOUND);
    }
  }
}