import { connect, Mongoose, set, model } from 'mongoose';
import { envConfig } from './envConfig';
import { getByType, addDefaultUser } from '../controllers/user';

export class MongooseService {
    private static mongoConnection: Mongoose = undefined;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    public static async connect(): Promise<void> {
        set("debug", (envConfig.server.environment === "local"));
        const { username, password, host, port, name } = envConfig.database;
        // eslint-disable-next-line max-len
        const mongoUrl = `mongodb+srv://${username}:${password}@${host}/${name}?ssl=true&authSource=admin&retryWrites=true`;
        // const mongoUrl = `mongodb://aashish:DMN6pY0XAEKcabuW@cluster0-shard-00-01-anips.mongodb.net:27017/sales_online_dev?ssl=true&authSource=admin&retryWrites=true`;
        if (!this.isConnected()) {
            connect(mongoUrl, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: false,
                socketTimeoutMS: 60000,
                connectTimeoutMS: 60000,
            })
            .then(async (connection) => {
                console.info(`successfully connected to database`);
                let user = await getByType("DEFAULT")
                if(!user){
                    let result = await addDefaultUser({
                        name : "Khushal Goyal",
                        email : "khushalgoyal201910feb@gmail.com",
                        password : "khushal098"
                    });
                    console.log(result)
                }
                this.setConnection(connection);
            })
            .catch((err) => {
                console.warn(`mongo connection error`, err);
            });
        } else {
            console.info(`Database Already Connected`);
        }
    }

    public static setConnection(connection: Mongoose): void {
        this.mongoConnection = connection;
        this.mongoConnection.connection.on("disconnected", () => {
            console.info("database connection closed");
        });
    }

    public static isConnected(): boolean {
        if (this.mongoConnection && this.mongoConnection.connection) {
            const { readyState } = this.mongoConnection.connection;
            console.info(`MongoDB ready state = ${readyState}`);
            return readyState === 1;
        }
        return false;
    }

    public static getConnection(): Mongoose {
        return this.mongoConnection;
    }

    public static disconnect(): void {
        this.mongoConnection.connection.close(() => {
            this.mongoConnection = undefined;
            process.exit(0);
        });
    }
}
