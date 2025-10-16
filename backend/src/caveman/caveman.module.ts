import { Module } from "@nestjs/common";
import { CavemanService } from "./caveman.service";
import { CavemanController } from "./caveman.controller";
import { PrismaModule } from "prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [CavemanController],
  providers: [CavemanService],
})
export class CavemanModule {}
