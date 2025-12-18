import { Caveman } from "../entities/caveman.entity";

export interface CavemanRepository {
  create(caveman: Omit<Caveman, "id">, userId: string): Promise<Caveman>;
  findByName(name: string, userId: string): Promise<Caveman | null>;
  findById(id: string, userId: string): Promise<Caveman | null>;
  findAll(userId: string): Promise<Caveman[]>;
  update(
    caveman: Partial<Omit<Caveman, "id" | "userId">>,
    cavemanId: string,
    userId: string,
  ): Promise<Caveman>;
  delete(userId: string, cavemanId: string): Promise<object>;
}
export const CAVEMAN_REPOSITORY_PORT = Symbol("CavemanRepository");
