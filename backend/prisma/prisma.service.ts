import {
  INestApplication,
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect(); // Connect to the database when the module is initialized
  }

  // This method is called when the NestJS application is shutting down
  // (provided that app.enableShutdownHooks() has been called in main.ts).
  async onModuleDestroy() {
    await this.$disconnect(); // Disconnect from the database when the module is destroyed
  }

  // This method is responsible for enabling the NestJS shutdown hooks.
  // This is typically called in main.ts.
  async enableShutdownHooks(app: INestApplication) {
    app.enableShutdownHooks();
    // There is no need to subscribe to Prisma's own 'beforeExit' event here.
    // The NestJS OnModuleDestroy hook ensures that $disconnect() is called.
  }
}
