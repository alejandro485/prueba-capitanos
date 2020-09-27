import { Test, TestingModule } from '@nestjs/testing';
import { SingletonMongoService } from './singleton-mongo.service';

describe('SingletonMongoService', () => {
  let service: SingletonMongoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SingletonMongoService],
    }).compile();

    service = module.get<SingletonMongoService>(SingletonMongoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
