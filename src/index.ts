import { ServerBootstrap } from "@server/server.bootstrap";
import app from "./app";
import { DatabaseBootstrap } from "@server/database.bootstrap";
import env from "@core/env";


(async() => {
    const server = new ServerBootstrap(app);
    const database = new DatabaseBootstrap();
    try {
        const listPromise = [server.init(), database.init()]
        await Promise.all(listPromise);
        console.log(`Connected to database ${env.DB_CONFIG().database}`);
    } catch (error) {
        console.log(error);
        server.close();
        database.close();
        throw new Error(error as string)
    }
})();