import { Injectable, Inject } from "@nestjs/common";
import { User } from "src/domain/entities/user.entity";
import {
  USER_REPOSITORY_PORT,
  UserRepository,
} from "src/domain/repositories/user.repository";

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject(USER_REPOSITORY_PORT)
    private userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
