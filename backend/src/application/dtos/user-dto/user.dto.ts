export class CreateUserDto {
  email: string;
  password: string;
  name: string;
  age: number;
}
export class UpdateUserDto {
  email?: string;
  name?: string;
  password?: string;
  age?: number;
}
export class LoginUserDto {
  email: string;
  password: string;
}
