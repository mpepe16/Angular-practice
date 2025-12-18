import { ConflictException, NotFoundException } from "@nestjs/common";

export class CavemanException extends NotFoundException {
  constructor(message: string) {
    super(message);
    this.name = "CavemanException";
  }
}

export class CavemanAlreadyExistsException extends ConflictException {
  constructor(id?: string) {
    super(`Caveman with ID ${id} already exists.`);
    this.name = "CavemanAlreadyExistsException";
  }
}
