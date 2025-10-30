import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/domain/entities/user.entity";
import {
  USER_REPOSITORY_PORT,
  UserRepository,
} from "src/domain/repositories/user.repository";

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_PORT)
    private userRepository: UserRepository,
  ) {}

  async execute(id: string, userData: Partial<User>): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) return null;
    const updatedUser = { ...user, ...userData };
    return this.userRepository.update(updatedUser);
  }
}
