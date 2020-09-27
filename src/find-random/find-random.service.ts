import { Injectable, ConflictException } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { SingletonMongoService } from '../singleton-mongo/singleton-mongo.service';

@Injectable()
export class FindRandomService {

    constructor(
        private singletonMongoService: SingletonMongoService,
    ) { }

    public async getRandomsHunters(user: string) {
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

        const hunterCollection = db.collection(process.env.HUNTER_COLLECTION);
        return hunterCollection.aggregate([
            {
                $match: {
                    locked: false,
                    level: {
                        $gte: userInfo.hunterSelectedInfo.level - 10,
                        $lte: userInfo.hunterSelectedInfo.level + 10,
                    }
                }
            },
            {
                $sample: {
                    size: 10,
                }
            }
        ]).toArray();

    }

}
