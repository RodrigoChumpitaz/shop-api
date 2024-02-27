import env from "@core/env";
import { IBootstrap } from "@server/bootstrap.interface";
import { DataSource } from "typeorm";
import { connect, connection } from 'mongoose'

export class DatabaseBootstrap implements IBootstrap {
    static dbInstance: DataSource;

    init(): Promise<any> {
        const dbConfig = env.DB_CONFIG();
        try {
            const dataSource = new DataSource({
                type: env.DB_TYPE as any,
                ...dbConfig,
                migrations: [],
                subscribers: []
            })
            DatabaseBootstrap.dbInstance = dataSource;
            return dataSource.initialize();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    initMongo(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            console.time('MongoDB Connection Time');
            try {
                const db = await connect(env.MONGO_DB_HOST);
                console.timeEnd('MongoDB Connection Time');
                resolve(db);
            } catch (error) {
                console.timeEnd('MongoDB Connection Time');
                reject(error);
            }
        })
    }

    close(): void {
        DatabaseBootstrap.dbInstance?.destroy();
    }

    closeMongonConnection(): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                await connection.close();
                resolve(true);
            } catch (error) {
                reject(error);
            }
        })
    }

    static get AppDataSource(): DataSource{
        return DatabaseBootstrap.dbInstance;
    }
}