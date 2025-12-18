import { Module } from "@nestjs/common";
import { UserPresentationModule } from "./presentation/modules/user-presentation.module";
import { CavemanPresentationModule } from "./presentation/modules/caveman-presentation.module";

@Module({
  imports: [UserPresentationModule, CavemanPresentationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
