import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTermServiceDto } from "./dto/createTerm.dto";
import { UpdateTermServiceDto } from "./dto/updateTerm.dto";
import Term from "./term.entity";

@Injectable()
export default class TermsService {
  constructor(
    @InjectRepository(Term)
    private readonly termsRepository: Repository<Term>
  ) {}

  findAllTerm() {
    return this.termsRepository.find({ relations: ['year']});
  }

  findTermById(id: number) {
    return this.termsRepository.findOne(id);
  }

  async createTerm(term: CreateTermServiceDto) {
    const newTerm = await this.termsRepository.create(term);
    await this.termsRepository.save(newTerm);
    return newTerm;
  }

  async updateTerm(id: number, term: UpdateTermServiceDto) {
    await this.termsRepository.update(id, term);
    const updatedTerm = await this.termsRepository.findOne(id);
    if (updatedTerm) {
      return updatedTerm;
    } 
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  async deleteTerm(id: number) {
    const deleteResponse = await this.termsRepository.delete(id);
    if(!deleteResponse.affected) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}