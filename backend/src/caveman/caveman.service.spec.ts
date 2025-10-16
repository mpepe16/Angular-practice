import { Test, TestingModule } from "@nestjs/testing";
import { CavemanService } from "./caveman.service";

describe("CavemanService", () => {
  let service: CavemanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CavemanService],
    }).compile();

    service = module.get<CavemanService>(CavemanService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
