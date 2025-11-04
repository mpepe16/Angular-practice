import { Injectable, Inject } from "@nestjs/common";
import { CreateCavemanDto } from "src/application/dtos/caveman-dto/create-caveman.dto";
import { Caveman } from "src/domain/entities/caveman.entity";
import { CavemanAlreadyExistsException } from "src/domain/exceptions/caveman.exception";
import {
  CAVEMAN_REPOSITORY_PORT,
  CavemanRepository,
} from "src/domain/repositories/caveman.repository";

@Injectable()
export class CreateCavemanUseCase {
  constructor(
    @Inject(CAVEMAN_REPOSITORY_PORT)
    private cavemanRepository: CavemanRepository,
  ) {}

  async execute(
    createCavemanDto: CreateCavemanDto,
    userId: string,
  ): Promise<Caveman> {
    const existingCaveman = await this.cavemanRepository.findByName(
      createCavemanDto.name,
      userId,
    );
    if (existingCaveman) {
      throw new CavemanAlreadyExistsException(createCavemanDto.name);
    }
    return await this.cavemanRepository.create(createCavemanDto, userId);
  }
}
