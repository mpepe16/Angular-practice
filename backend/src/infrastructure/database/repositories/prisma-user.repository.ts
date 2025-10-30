import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { User } from "../../../domain/entities/user.entity";
import { UserNotFoundException } from "src/domain/exceptions/user.exception";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(): Promise<User[]> {
    const prismaUsers = await this.prisma.user.findMany();
    return prismaUsers.map(
      (pu) => new User(pu.id, pu.email, pu.name, pu.password),
    );
  }

  async findById(id: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({ where: { id } });
    if (!prismaUser) return null;
    return new User(
      prismaUser.id,
      prismaUser.email,
      prismaUser.name,
      prismaUser.password,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({ where: { email } });
    if (!prismaUser) return null;
    return new User(
      prismaUser.id,
      prismaUser.email,
      prismaUser.name,
      prismaUser.password,
    );
  }

  async create(user: Omit<User, "id">): Promise<User> {
    const prismaUser = await this.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password!,
      },
    });

    return new User(
      prismaUser.id,
      prismaUser.email,
      prismaUser.name,
      prismaUser.password,
    );
  }

  async update(user: User): Promise<User> {
    const prismaUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        email: user.email,
        name: user.name,
        password: user.password!,
      },
    });
    return new User(
      prismaUser.id,
      prismaUser.email,
      prismaUser.name,
      prismaUser.password,
    );
  }

  async delete(id: string): Promise<object> {
    try {
      await this.prisma.user.delete({ where: { id } });
      return {};
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new UserNotFoundException(id);
      }
      throw error;
    }
  }
}
