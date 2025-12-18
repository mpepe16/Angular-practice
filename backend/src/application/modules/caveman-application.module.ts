import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infrastructure/modules/database.module";
import { CreateCavemanUseCase } from "../use-cases/caveman/create-caveman.use-case";
import { DeleteCavemanUseCase } from "../use-cases/caveman/delete-caveman.use-case";
import { FindAllCavemanUseCase } from "../use-cases/caveman/find-all-caveman.use-case";
import { FindOneCavemanUseCase } from "../use-cases/caveman/find-one-caveman.use-case";
import { UpdateCavemanUseCase } from "../use-cases/caveman/update-caveman.use-case";

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    CreateCavemanUseCase,
    FindAllCavemanUseCase,
    FindOneCavemanUseCase,
    UpdateCavemanUseCase,
    DeleteCavemanUseCase,
  ],
  exports: [
    CreateCavemanUseCase,
    FindAllCavemanUseCase,
    FindOneCavemanUseCase,
    UpdateCavemanUseCase,
    DeleteCavemanUseCase,
  ],
})
export class CavemanApplicationModule {}
