import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { FindFriendsService } from './find-friends/find-friends.service';
import { FindRandomService } from './find-random/find-random.service';
import { SingletonMongoService } from './singleton-mongo/singleton-mongo.service';

@Controller()
export class AppController {
	constructor(
		private appService: AppService,
		private findFriendsService: FindFriendsService,
		private findRandomService: FindRandomService,
		private singletonMongoService: SingletonMongoService,
	) {
		this.singletonMongoService.getDB();
	}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Get('/:user/friends')
	getFriends(@Param('user') user: string) {
		return this.findFriendsService.getFriendsHunters(user);
	}

	@Get('/:user/randoms')
	getRandoms(@Param('user') user: string) {
		return this.findRandomService.getRandomsHunters(user);
	}

}
