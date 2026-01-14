import { CavemanRepository } from "../../../domain/repositories/caveman.repository";
import { CreateCavemanUseCase } from "./create-caveman.use-case";
import { CavemanAlreadyExistsException } from "../../../domain/exceptions/caveman.exception";
describe("CreateCavemanUseCase", () => {
  let useCase: CreateCavemanUseCase;
  let cavemanRepository: jest.Mocked<CavemanRepository>;

  beforeEach(() => {
    cavemanRepository = {
      findByName: jest.fn(),
      create: jest.fn(),
    } as any;
    useCase = new CreateCavemanUseCase(cavemanRepository);
  });

  it("should create a new caveman if not exists", async () => {
    cavemanRepository.findByName.mockResolvedValue(null);
    const fakeCaveman = { id: "1", name: "Bob" } as any;
    cavemanRepository.create.mockResolvedValue(fakeCaveman);

    const result = await useCase.execute({ name: "Bob" } as any, "user1");
    expect(result).toBe(fakeCaveman);
    expect(cavemanRepository.create).toHaveBeenCalledWith(
      { name: "Bob" },
      "user1",
    );
  });

  it("should throw if caveman already exists", async () => {
    cavemanRepository.findByName.mockResolvedValue({
      id: "1",
      name: "Bob",
    } as any);

    await expect(
      useCase.execute({ name: "Bob" } as any, "user1"),
    ).rejects.toBeInstanceOf(CavemanAlreadyExistsException);
    expect(cavemanRepository.create).not.toHaveBeenCalled();
  });
});
