import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { YearsModule } from "src/years/years.module";
import Term from "./term.entity";
import TermsController from "./terms.controller";
import TermsService from "./terms.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Term]), 
    forwardRef(() => YearsModule)
  ],
  controllers: [TermsController],
  providers: [TermsService],
  exports: [TermsService],
})

export class TermsModule {}