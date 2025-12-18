import { Module } from "@nestjs/common";
import { WinstonLoggerService } from "./winston-logger.service";
import { I_LOGGER } from "src/application/ports/logger.port";

@Module({
  providers: [
    {
      provide: I_LOGGER,
      useClass: WinstonLoggerService,
    },
  ],
  exports: [I_LOGGER],
})
export class LoggerModule {}
