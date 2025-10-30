import { Module } from "@nestjs/common";
import { UserController } from "../controllers/user.controller";
import { UserApplicationModule } from "../../application/modules/user-application.module";

@Module({
  imports: [UserApplicationModule], // Import the application module
  controllers: [UserController],
  // No providers needed here as they are in the application module
})
export class UserPresentationModule {}
