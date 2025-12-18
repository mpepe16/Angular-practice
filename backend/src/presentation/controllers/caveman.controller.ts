import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from "@nestjs/common";
import { CreateCavemanDto } from "src/application/dtos/caveman-dto/create-caveman.dto";
import { UpdateCavemanDto } from "src/application/dtos/caveman-dto/update-caveman.dto";
import { I_LOGGER, ILogger } from "src/application/ports/logger.port";
import { CreateCavemanUseCase } from "src/application/use-cases/caveman/create-caveman.use-case";
import { DeleteCavemanUseCase } from "src/application/use-cases/caveman/delete-caveman.use-case";
import { FindAllCavemanUseCase } from "src/application/use-cases/caveman/find-all-caveman.use-case";
import { FindOneCavemanUseCase } from "src/application/use-cases/caveman/find-one-caveman.use-case";
import { UpdateCavemanUseCase } from "src/application/use-cases/caveman/update-caveman.use-case";

@Controller("users/:userid/caveman")
export class CavemanController {
  constructor(
    @Inject(I_LOGGER) private readonly logger: ILogger,
    private readonly createCavemanUseCase: CreateCavemanUseCase,
    private readonly findAllCavemenUseCase: FindAllCavemanUseCase,
    private readonly findCavemanByIdUseCase: FindOneCavemanUseCase,
    private readonly updateCavemanUseCase: UpdateCavemanUseCase,
    private readonly removeCavemanUseCase: DeleteCavemanUseCase,
  ) {}

  @Post()
  create(
    @Param("userid") userId: string,
    @Body() createCavemanDto: CreateCavemanDto,
  ) {
    return this.createCavemanUseCase.execute(createCavemanDto, userId);
  }
  @Get()
  findAll(@Param("userid") userId: string) {
    this.logger.info(`CavemanController: findAll called for userId=${userId}`);
    return this.findAllCavemenUseCase.execute(userId);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Param("userid") userId: string) {
    return this.findCavemanByIdUseCase.execute(id, userId);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCavemanDto: UpdateCavemanDto,
    @Param("userid") userId: string,
  ) {
    return this.updateCavemanUseCase.execute(id, updateCavemanDto, userId);
  }

  @Delete(":id")
  remove(@Param("userid") userId: string, @Param("id") id: string) {
    return this.removeCavemanUseCase.execute(userId, id);
  }
}
