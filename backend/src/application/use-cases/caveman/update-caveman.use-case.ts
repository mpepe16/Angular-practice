import { Inject, Injectable } from "@nestjs/common";
import { Caveman } from "src/domain/entities/caveman.entity";
import {
  CAVEMAN_REPOSITORY_PORT,
  CavemanRepository,
} from "src/domain/repositories/caveman.repository";

@Injectable()
export class UpdateCavemanUseCase {
  constructor(
    @Inject(CAVEMAN_REPOSITORY_PORT)
    private readonly cavemanRepository: CavemanRepository,
  ) {}
  async execute(
    cavemanId: string,
    updateData: Partial<Omit<Caveman, "id" | "userId">>,
    userId: string,
  ): Promise<void> {
    await this.cavemanRepository.update(updateData, cavemanId, userId);
  }
}
