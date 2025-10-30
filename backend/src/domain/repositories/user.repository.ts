import { User } from "../entities/user.entity";

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(user: Omit<User, "id">): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<object>;
}
export const USER_REPOSITORY_PORT = Symbol("UserRepository");
