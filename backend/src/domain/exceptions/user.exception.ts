import { NotFoundException, ConflictException } from "@nestjs/common";

export class UserNotFoundException extends NotFoundException {
  constructor(id?: string) {
    super(`User with ID ${id} not found.`);
  }
}

export class EmailAlreadyTakenException extends ConflictException {
  constructor(email: string) {
    super(`Email ${email} is already taken.`);
  }
}
