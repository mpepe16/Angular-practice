import { CAVEMAN_REPOSITORY_PORT } from "src/domain/repositories/caveman.repository";
import { Module } from "@nestjs/common";
import { USER_REPOSITORY_PORT } from "../../domain/repositories/user.repository";
import { PrismaUserRepository } from "../database/repositories/prisma-user.repository";
import { PrismaService } from "prisma/prisma.service";
import { PrismaCavemanRepository } from "../database/repositories/prisma-caveman.repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: USER_REPOSITORY_PORT,
      useClass: PrismaUserRepository,
    },
    {
      provide: CAVEMAN_REPOSITORY_PORT,
      useClass: PrismaCavemanRepository,
    },
  ],
  exports: [PrismaService, USER_REPOSITORY_PORT, CAVEMAN_REPOSITORY_PORT],
})
export class DatabaseModule {}
