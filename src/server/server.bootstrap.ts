import { IBootstrap } from "@server/bootstrap.interface";
import http from "http";
import { Application } from "express";
import env from "@core/env";

export class ServerBootstrap implements IBootstrap{
    constructor(private app: Application){}

    init(): Promise<any> {
        return new Promise((resolve, reject) => {
            const server = http.createServer(this.app);
            server
                .listen(env.PORT)
                .on("listening",() => {
                    console.log(`server running on port ${env.PORT}`);
                    resolve(`server running on port ${env.PORT}`);
                })
                .on("error", (err) => {
                    console.log(err);
                    reject(err);
                })
        })
    }
    close(): void {
        process.exit(1);
    }
}