import { Module } from "@nestjs/common";
import { UserPresentationModule } from "./presentation/modules/user-presentation.module";

@Module({
  imports: [UserPresentationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
