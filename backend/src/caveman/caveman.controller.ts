import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CavemanService } from "./caveman.service";
import { CreateCavemanDto } from "./dto/create-caveman.dto";
import { UpdateCavemanDto } from "./dto/update-caveman.dto";

@Controller("caveman")
export class CavemanController {
  constructor(private readonly cavemanService: CavemanService) {}

  @Post()
  create(@Body() createCavemanDto: CreateCavemanDto) {
    return this.cavemanService.create(createCavemanDto);
  }

  @Get()
  findAll() {
    return this.cavemanService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.cavemanService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCavemanDto: UpdateCavemanDto) {
    return this.cavemanService.update(id, updateCavemanDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.cavemanService.remove(id);
  }
}
