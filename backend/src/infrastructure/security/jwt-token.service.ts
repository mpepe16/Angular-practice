import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TokenService } from "../../application/ports/token.service.port";
import { User } from "src/domain/entities/user.entity";

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(user: User): string {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
