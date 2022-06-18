import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Classroom } from "./classroom.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Classroom])],
  controllers: [],
  providers: [],
})

export class StudentsModule {}