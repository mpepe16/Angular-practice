import { PartialType } from "@nestjs/mapped-types";
import { CreateCavemanDto } from "./create-caveman.dto";

export class UpdateCavemanDto extends PartialType(CreateCavemanDto) {}
