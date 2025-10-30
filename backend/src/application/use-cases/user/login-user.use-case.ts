import { Inject, Injectable } from "@nestjs/common";
import { AuthResponse } from "src/application/dtos/user-dto/auth-response.dto";
import { LoginUserDto } from "src/application/dtos/user-dto/user.dto";
import { InvalidCredentialsException } from "src/application/exceptions/invalid-credentials.exception";
import {
  PASSWORD_HASHER_PORT,
  PasswordHasher,
} from "src/application/ports/password-hasher.port";
import {
  TOKEN_SERVICE_PORT,
  TokenService,
} from "src/application/ports/token.service.port";
import {
  USER_REPOSITORY_PORT,
  UserRepository,
} from "src/domain/repositories/user.repository";

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_PORT)
    private userRepository: UserRepository,
    @Inject(PASSWORD_HASHER_PORT)
    private passwordHasher: PasswordHasher,
    @Inject(TOKEN_SERVICE_PORT)
    private tokenService: TokenService,
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(loginUserDto.email);

    if (!user) {
      throw new InvalidCredentialsException();
    }

    const isPasswordValid = await this.passwordHasher.compare(
      loginUserDto.password,
      user.password!,
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    const accessToken = this.tokenService.generateAccessToken(user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return {
      accessToken,
      user: userWithoutPassword,
    };
  }
}
