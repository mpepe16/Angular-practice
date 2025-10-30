import { User } from "../../domain/entities/user.entity";

export interface TokenService {
  generateAccessToken(user: User): string;
  // generateRefreshToken(user: User): string;
}

export const TOKEN_SERVICE_PORT = Symbol("TokenService");
