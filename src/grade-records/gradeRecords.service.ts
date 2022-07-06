import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import GradeRecordsFilterQuery from "src/utils/gradeRecordsFilterQuery";
import { Repository } from "typeorm";
import { CreateGradeRecordServiceDto } from "./dto/createGradeRecord.dto";
import { UpdateGradeRecordServiceDto } from "./dto/updateGradeRecord.dto";
import GradeRecord from "./gradeRecord.entity";

@Injectable()
export default class GradeRecordsService {
  constructor(
    @InjectRepository(GradeRecord)
    private readonly gradeRecordsRepository: Repository<GradeRecord>
  ) {}
  
  findAllGradeRecord() {
    return this.gradeRecordsRepository.find();
  }

  findGradeRecordByCourse(query: GradeRecordsFilterQuery) {
    const { year, term, courseId } = query;
    return this.gradeRecordsRepository.find({
      relations: ['course'],
      where: {
        term: term,
        year: year,
        course: {
          id: courseId
        }
      }
    });
  }

  findGradeRecordById(id: number) {
    return this.gradeRecordsRepository.findOne(id);
  }

  async createGradeRecord(record: CreateGradeRecordServiceDto) {
    const newRecord = await this.gradeRecordsRepository.create(record);
    await this.gradeRecordsRepository.save(newRecord);
    return newRecord;
  }

  async updateGradeRecord(id: number, record: UpdateGradeRecordServiceDto) {
    await this.gradeRecordsRepository.update(id, {...record});
    const updatedRecord = await this.findGradeRecordById(id);
    if (updatedRecord) {
      return updatedRecord;
    }
  }

  async deleteGradeRecord(id: number) {
    const deleteResponse = await this.gradeRecordsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND); 
    }
  }
    
}