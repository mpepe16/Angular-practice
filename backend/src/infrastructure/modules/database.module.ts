import { Module } from "@nestjs/common";
import { USER_REPOSITORY_PORT } from "../../domain/repositories/user.repository";
import { PrismaUserRepository } from "../database/repositories/prisma-user.repository";
import { PrismaService } from "prisma/prisma.service";

@Module({
  providers: [
    PrismaService,
    {
      provide: USER_REPOSITORY_PORT,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [PrismaService, USER_REPOSITORY_PORT], // Exportáljuk, hogy más modulok is használhassák
})
export class DatabaseModule {}
