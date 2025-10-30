import { Module } from "@nestjs/common";

import { DatabaseModule } from "../../infrastructure/modules/database.module";
import { SecurityModule } from "../../infrastructure/modules/security.module";
import { CreateUserUseCase } from "src/application/use-cases/user/create-user.use-case";
import { DeleteUserUseCase } from "src/application/use-cases/user/delete-user.use-case";
import { FindAllUsersUseCase } from "src/application/use-cases/user/find-all-user.use-case";
import { FindOneUserUseCase } from "src/application/use-cases/user/find-one-user.use-case";
import { LoginUserUseCase } from "src/application/use-cases/user/login-user.use-case";
import { UpdateUserUseCase } from "src/application/use-cases/user/update-user.use-case";

@Module({
  imports: [DatabaseModule, SecurityModule],
  providers: [
    CreateUserUseCase,
    LoginUserUseCase,
    FindAllUsersUseCase,
    FindOneUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [
    CreateUserUseCase,
    LoginUserUseCase,
    FindAllUsersUseCase,
    FindOneUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UserApplicationModule {}
