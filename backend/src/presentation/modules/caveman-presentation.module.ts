import { Module } from "@nestjs/common";
import { CavemanApplicationModule } from "src/application/modules/caveman-application.module";
import { CavemanController } from "../controllers/caveman.controller";
import { LoggerModule } from "src/infrastructure/logger/logger.module";

@Module({
  imports: [CavemanApplicationModule, LoggerModule],
  controllers: [CavemanController],
})
export class CavemanPresentationModule {}
