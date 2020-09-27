import { Test, TestingModule } from '@nestjs/testing';
import { SocketResponsesService } from './socket-responses.service';

describe('SocketResponsesService', () => {
  let service: SocketResponsesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketResponsesService],
    }).compile();

    service = module.get<SocketResponsesService>(SocketResponsesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
