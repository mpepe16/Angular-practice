import { Test, TestingModule } from "@nestjs/testing";
import { CavemanController } from "./caveman.controller";
import { CavemanService } from "./caveman.service";

describe("CavemanController", () => {
  let controller: CavemanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CavemanController],
      providers: [CavemanService],
    }).compile();

    controller = module.get<CavemanController>(CavemanController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
