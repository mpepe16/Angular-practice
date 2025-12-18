// src/application/use-cases/create-user.use-case.ts

import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/application/dtos/user-dto/user.dto";
import { AuthResponse } from "src/application/dtos/user-dto/auth-response.dto";
import {
  PASSWORD_HASHER_PORT,
  PasswordHasher,
} from "src/application/ports/password-hasher.port";
import {
  TOKEN_SERVICE_PORT,
  TokenService,
} from "src/application/ports/token.service.port";
import { EmailAlreadyTakenException } from "src/domain/exceptions/user.exception";
import {
  USER_REPOSITORY_PORT,
  UserRepository,
} from "src/domain/repositories/user.repository";

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_PORT)
    private userRepository: UserRepository,
    @Inject(PASSWORD_HASHER_PORT)
    private passwordHasher: PasswordHasher,
    @Inject(TOKEN_SERVICE_PORT)
    private tokenService: TokenService,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new EmailAlreadyTakenException(createUserDto.email);
    }
    const hashedPassword = await this.passwordHasher.hash(
      createUserDto.password,
    );
    const newUser = await this.userRepository.create({
      email: createUserDto.email,
      name: createUserDto.name,
      password: hashedPassword,
    });

    const accessToken = this.tokenService.generateAccessToken(newUser);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = newUser;

    return {
      accessToken,
      user: userWithoutPassword,
    };
  }
}
