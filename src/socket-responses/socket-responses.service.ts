import { Injectable } from '@nestjs/common';
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FindFriendsService } from '../find-friends/find-friends.service';
import { FindRandomService } from '../find-random/find-random.service';

@Injectable()
@WebSocketGateway()
export class SocketResponsesService {
    
    @WebSocketServer() server: Server;

    constructor(
        private findFriendsService: FindFriendsService,
        private findRandomService: FindRandomService,
    ) { }

    @SubscribeMessage('friends-in')
    async getFriends(@MessageBody() data) {
        console.log('friends user: ', data);
        const info = await this.findFriendsService.getFriendsHunters(data.user);
        this.server.emit('friends-out', info);
        return info;
    }

    @SubscribeMessage('randoms-in')
    async getRandoms(@MessageBody() data) {
        console.log('randoms user: ', data);
        const info = await  this.findRandomService.getRandomsHunters(data.user);
        this.server.emit('randoms-out', info);
        return info;
    }

}
