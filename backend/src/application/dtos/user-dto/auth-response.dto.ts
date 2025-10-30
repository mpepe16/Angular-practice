import { User } from "../../../domain/entities/user.entity";

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user: Omit<User, "password">;
}
