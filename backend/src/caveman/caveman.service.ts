import { Injectable } from "@nestjs/common";
import { CreateCavemanDto } from "./dto/create-caveman.dto";
import { UpdateCavemanDto } from "./dto/update-caveman.dto";
import { PrismaService } from "../../prisma/prisma.service";
import { Caveman } from "@prisma/client";
@Injectable()
export class CavemanService {
  constructor(private prisma: PrismaService) {}
  create(createCavemanDto: CreateCavemanDto): Promise<Caveman> {
    return this.prisma.caveman.create({
      data: createCavemanDto,
    });
  }

  findAll(): Promise<Caveman[]> {
    return this.prisma.caveman.findMany();
  }

  findOne(id: string): Promise<Caveman | null> {
    return this.prisma.caveman.findUnique({
      where: { id },
    });
  }
  update(id: string, updateCavemanDto: UpdateCavemanDto): Promise<Caveman> {
    return this.prisma.caveman.update({
      where: { id },
      data: updateCavemanDto,
    });
  }

  remove(id: string): Promise<Caveman> {
    return this.prisma.caveman.delete({
      where: { id },
    });
  }
}
