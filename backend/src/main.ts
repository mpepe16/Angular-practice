import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "http://localhost:4200", // <-- NAGYON FONTOS: Ide az Angular frontend URL-jét kell beírni!
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Engedélyezett HTTP metódusok
    credentials: true, // Ha használsz cookie-kat vagy hitelesítést (session, JWT)
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
