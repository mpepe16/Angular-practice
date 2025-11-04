import { Inject } from "@nestjs/common";
import { Caveman } from "src/domain/entities/caveman.entity";
import {
  CAVEMAN_REPOSITORY_PORT,
  CavemanRepository,
} from "src/domain/repositories/caveman.repository";

export class FindOneCavemanUseCase {
  constructor(
    @Inject(CAVEMAN_REPOSITORY_PORT)
    private readonly cavemanRepository: CavemanRepository,
  ) {}

  async execute(cavemanId: string, userId: string): Promise<Caveman | null> {
    return this.cavemanRepository.findById(cavemanId, userId);
  }
}
