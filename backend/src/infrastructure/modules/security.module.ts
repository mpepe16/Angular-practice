import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PASSWORD_HASHER_PORT } from "../../application/ports/password-hasher.port";
import { BcryptPasswordHasher } from "../security/bcrypt-password-hasher.service";
import { TOKEN_SERVICE_PORT } from "../../application/ports/token.service.port";
import { JwtTokenService } from "../security/jwt-token.service";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || "superSecretKey",
      signOptions: { expiresIn: "60s" }, // configure life span as needed
    }),
  ],
  providers: [
    {
      provide: PASSWORD_HASHER_PORT,
      useClass: BcryptPasswordHasher,
    },
    {
      provide: TOKEN_SERVICE_PORT,
      useClass: JwtTokenService,
    },
  ],
  exports: [PASSWORD_HASHER_PORT, TOKEN_SERVICE_PORT, JwtModule],
})
export class SecurityModule {}
