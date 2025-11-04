import { Inject, Injectable } from "@nestjs/common";
import {
  CAVEMAN_REPOSITORY_PORT,
  CavemanRepository,
} from "src/domain/repositories/caveman.repository";
import { Caveman } from "src/generated/prisma/wasm";

@Injectable()
export class FindAllCavemanUseCase {
  constructor(
    @Inject(CAVEMAN_REPOSITORY_PORT)
    private readonly cavemanRepository: CavemanRepository,
  ) {}

  async execute(userId: string): Promise<Caveman[]> {
    return this.cavemanRepository.findAll(userId);
  }
}
