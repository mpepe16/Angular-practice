import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CavemanRepository } from "src/domain/repositories/caveman.repository";
import { Caveman } from "../../../domain/entities/caveman.entity";

@Injectable()
export class PrismaCavemanRepository implements CavemanRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(caveman: Caveman, userId: string): Promise<Caveman> {
    const created = await this.prisma.caveman.create({
      data: {
        name: caveman.name,
        location: caveman.location,
        age: caveman.age,
        user: { connect: { id: userId } },
        inventory: { create: {} },
        skill_tree: { create: {} },
      },
    });

    const prismaCaveman: Caveman = new Caveman(
      created.id,
      created.name,
      created.age,
      created.location,
    );
    return prismaCaveman;
  }
  async findByName(name: string, userId: string): Promise<Caveman | null> {
    const findByName = await this.prisma.caveman.findUnique({
      where: {
        userId_name: {
          name,
          userId,
        },
      },
    });
    if (!findByName) {
      return null;
    }
    return new Caveman(
      findByName.id,
      findByName.name,
      findByName.age,
      findByName.location,
    );
  }
  async findById(id: string, userId: string): Promise<Caveman | null> {
    const findById = await this.prisma.caveman.findUnique({
      where: { id, userId },
    });
    if (!findById) {
      return null;
    }
    return new Caveman(
      findById.id,
      findById.name,
      findById.age,
      findById.location,
    );
  }
  async findAll(userId: string): Promise<Caveman[]> {
    const prismaCavemen = await this.prisma.caveman.findMany({
      where: { userId },
    });
    return prismaCavemen.map(
      (pc) => new Caveman(pc.id, pc.name, pc.age, pc.location),
    );
  }

  async update(caveman: Caveman, id: string, userId: string): Promise<Caveman> {
    const updated = await this.prisma.caveman.update({
      where: { id, userId },
      data: {
        name: caveman.name,
        location: caveman.location,
        age: caveman.age,
      },
    });
    return new Caveman(updated.id, updated.name, updated.age, updated.location);
  }
  async delete(userId: string, id: string): Promise<object> {
    const deleted = await this.prisma.caveman.delete({ where: { id, userId } });
    return { id: deleted.id };
  }
}
