import env from "@core/env";
import { IBootstrap } from "@server/bootstrap.interface";
import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";

export class DatabaseBootstrap implements IBootstrap {
    static dbInstance: DataSource;

    init(): Promise<any> {
        const dbConfig = env.DB_CONFIG();
        try {
            const dataSource = new DataSource({
                type: 'mysql',
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
    close(): void {
        DatabaseBootstrap.dbInstance?.destroy();
    }

    static get AppDataSource(): DataSource{
        return DatabaseBootstrap.dbInstance;
    }
}