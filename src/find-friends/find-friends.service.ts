import { Injectable, ConflictException } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { SingletonMongoService } from '../singleton-mongo/singleton-mongo.service';

@Injectable()
export class FindFriendsService {

    constructor(
        private singletonMongoService: SingletonMongoService,
    ) { }

    public async getFriendsHunters(user: string) {
        const db = await this.singletonMongoService.getDB();
        const userCollection = db.collection(process.env.USER_COLLECTION);

        const userListInfo = await userCollection.aggregate([
            {
                $match: {
                    _id: new ObjectID(user),
                }
            },
            {
                $lookup: {
                    from: process.env.HUNTER_COLLECTION,
                    localField: 'hunterSelected',
                    foreignField: '_id',
                    as: 'hunterSelectedInfo',
                },
            },
            { 
                $unwind: {
                    path: '$hunterSelectedInfo'
                },
            },
        ]).toArray();

        if (userListInfo.length != 1) {
            throw new ConflictException({
                message: 'No se encontro usuario o hunter',
            }, 'error el consultar usuario');
        }

        const userInfo = userListInfo[0];

        const listFriends = userInfo.friends.map(friend => {
            return new ObjectID(friend);
        });

        const hunterCollection = db.collection(process.env.HUNTER_COLLECTION);

        return hunterCollection.find({
            user: { $in: listFriends },
            locked: false,
            level: {
                $gte: userInfo.hunterSelectedInfo.level - 10,
                $lte: userInfo.hunterSelectedInfo.level + 10,
            }
        }).limit(10).toArray();

    }

}
