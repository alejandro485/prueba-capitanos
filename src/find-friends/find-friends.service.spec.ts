import { Test, TestingModule } from '@nestjs/testing';
import { FindFriendsService } from './find-friends.service';

describe('FindFriendsService', () => {
  let service: FindFriendsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindFriendsService],
    }).compile();

    service = module.get<FindFriendsService>(FindFriendsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
