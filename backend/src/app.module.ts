import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CavemanModule } from "./caveman/caveman.module";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    PrismaModule,
    CavemanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
