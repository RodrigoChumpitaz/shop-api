import dotenv from 'dotenv';

if (process.env.NODE_ENV == "production") {
    dotenv.config({ path: '.env.production' });
} else {
    dotenv.config({ path: '.env.development' });
}

export interface IDbConfig {
    host: string;
    port: number;
    entities: string[] | any;
    username: string;
    password: string;
    database: string;
    ssl: boolean;
    synchronize: boolean;
    logging: boolean;
}

export default class Environment {
    private static readonly env = process.env;

    public static get PORT(): number {
        return this.env.PORT as unknown as number;
    }

    public static get DB_TYPE(): string {
        return this.env.DB_TYPE as string;
    }

    public static DB_CONFIG(): IDbConfig {
        return {
            host: this.env.DB_HOST!,
            port: Number(this.env.DB_PORT),
            entities: [this.env.DB_ENTITIES],
            username: this.env.DB_USERNAME!,
            password: this.env.DB_PASSWORD!,
            database: this.env.DB_NAME!,
            ssl: this.env.DB_SSL as unknown as boolean,
            synchronize: this.env.DB_SYNCHRONIZE as unknown as boolean,
            logging: this.env.DB_LOGGING as unknown as boolean
        };
    }
}
