import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { AuthResponse } from "src/application/dtos/user-dto/auth-response.dto";
import {
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
} from "src/application/dtos/user-dto/user.dto";
import { CreateUserUseCase } from "src/application/use-cases/user/create-user.use-case";
import { DeleteUserUseCase } from "src/application/use-cases/user/delete-user.use-case";
import { FindAllUsersUseCase } from "src/application/use-cases/user/find-all-user.use-case";
import { FindOneUserUseCase } from "src/application/use-cases/user/find-one-user.use-case";
import { LoginUserUseCase } from "src/application/use-cases/user/login-user.use-case";
import { UpdateUserUseCase } from "src/application/use-cases/user/update-user.use-case";
import { User } from "src/domain/entities/user.entity";
import { UserNotFoundException } from "src/domain/exceptions/user.exception";

@Controller("user")
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post("/register")
  async create(@Body() createUserDto: CreateUserDto): Promise<AuthResponse> {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Post("/login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto): Promise<AuthResponse> {
    return this.loginUserUseCase.execute(loginUserDto);
  }

  @Get("")
  async findAll(): Promise<Omit<User, "password">[]> {
    const users = await this.findAllUsersUseCase.execute();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, ...rest }) => rest);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Omit<User, "password">> {
    const user = await this.findOneUserUseCase.execute(id);
    if (!user) {
      throw new UserNotFoundException(id);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    return rest;
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, "password">> {
    const updatedUser = await this.updateUserUseCase.execute(id, updateUserDto);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = updatedUser;
    return rest;
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<object> {
    await this.deleteUserUseCase.execute(id);
    return {};
  }
}
