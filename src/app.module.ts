import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FindFriendsService } from './find-friends/find-friends.service';
import { FindRandomService } from './find-random/find-random.service';
import { SingletonMongoService } from './singleton-mongo/singleton-mongo.service';
import { SocketResponsesService } from './socket-responses/socket-responses.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    FindFriendsService,
    FindRandomService,
    SingletonMongoService,
    SocketResponsesService,
  ],
})
export class AppModule { }
