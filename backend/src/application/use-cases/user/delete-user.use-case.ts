import { Injectable } from "@nestjs/common";
import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import {
  USER_REPOSITORY_PORT,
  UserRepository,
} from "src/domain/repositories/user.repository";

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_PORT)
    private userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) return;
    await this.userRepository.delete(id);
  }
}
