import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClassroomsModule } from "src/classrooms/classrooms.module";
import { TermsModule } from "src/terms/terms.module";
import Year from "./year.entity";
import YearsController from "./years.controller";
import YearsService from "./years.service";

@Module({
  imports: [TypeOrmModule.forFeature([Year]), 
    forwardRef(() => TermsModule),
    forwardRef(() => ClassroomsModule)
  ],
  controllers: [YearsController],
  providers: [YearsService],
  exports: [YearsService]
})

export class YearsModule {}