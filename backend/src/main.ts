import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  app.enableCors({
    origin: "http://localhost:4200", // <-- IMPORTANT: Enter the Angular frontend URL here!
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
    credentials: true, // In case sending cookies or authentication headers
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
