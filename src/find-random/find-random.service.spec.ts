import { Test, TestingModule } from '@nestjs/testing';
import { FindRandomService } from './find-random.service';

describe('FindRandomService', () => {
  let service: FindRandomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindRandomService],
    }).compile();

    service = module.get<FindRandomService>(FindRandomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
