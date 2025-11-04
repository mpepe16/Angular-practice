import { Inject, Injectable } from "@nestjs/common";
import {
  CAVEMAN_REPOSITORY_PORT,
  CavemanRepository,
} from "src/domain/repositories/caveman.repository";
@Injectable()
export class DeleteCavemanUseCase {
  constructor(
    @Inject(CAVEMAN_REPOSITORY_PORT)
    private readonly cavemanRepository: CavemanRepository,
  ) {}

  async execute(userId: string, cavemanId: string): Promise<void> {
    await this.cavemanRepository.delete(cavemanId, userId);
  }
}
