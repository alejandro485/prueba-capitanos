import { Injectable, ConflictException } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

@Injectable()
export class SingletonMongoService {

    private db: Db = null;

    public async getDB() {
        try {
            if (!this.db) {
                const client = await MongoClient.connect(process.env.MONGO_URL, { useUnifiedTopology: true });
                this.db = client.db(process.env.MONGO_DB);
            }
            return this.db;
        } catch (err) {
            throw new ConflictException(err, 'No se puede conectar a la db');
        }
    }

}
