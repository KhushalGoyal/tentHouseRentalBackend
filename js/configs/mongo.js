"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseService = void 0;
const mongoose_1 = require("mongoose");
const envConfig_1 = require("./envConfig");
const user_1 = require("../controllers/user");
class MongooseService {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() { }
    static async connect() {
        mongoose_1.set("debug", (envConfig_1.envConfig.server.environment === "local"));
        const { username, password, host, port, name } = envConfig_1.envConfig.database;
        // eslint-disable-next-line max-len
        const mongoUrl = `mongodb+srv://${username}:${password}@${host}/${name}?ssl=true&authSource=admin&retryWrites=true`;
        // const mongoUrl = `mongodb://aashish:DMN6pY0XAEKcabuW@cluster0-shard-00-01-anips.mongodb.net:27017/sales_online_dev?ssl=true&authSource=admin&retryWrites=true`;
        if (!this.isConnected()) {
            mongoose_1.connect(mongoUrl, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: false,
                socketTimeoutMS: 60000,
                connectTimeoutMS: 60000,
            })
                .then(async (connection) => {
                console.info(`successfully connected to database`);
                let user = await user_1.getByType("DEFAULT");
                if (!user) {
                    let result = await user_1.addDefaultUser({
                        name: "Khushal Goyal",
                        email: "khushalgoyal201910feb@gmail.com",
                        password: "khushal098"
                    });
                    console.log(result);
                }
                this.setConnection(connection);
            })
                .catch((err) => {
                console.warn(`mongo connection error`, err);
            });
        }
        else {
            console.info(`Database Already Connected`);
        }
    }
    static setConnection(connection) {
        this.mongoConnection = connection;
        this.mongoConnection.connection.on("disconnected", () => {
            console.info("database connection closed");
        });
    }
    static isConnected() {
        if (this.mongoConnection && this.mongoConnection.connection) {
            const { readyState } = this.mongoConnection.connection;
            console.info(`MongoDB ready state = ${readyState}`);
            return readyState === 1;
        }
        return false;
    }
    static getConnection() {
        return this.mongoConnection;
    }
    static disconnect() {
        this.mongoConnection.connection.close(() => {
            this.mongoConnection = undefined;
            process.exit(0);
        });
    }
}
exports.MongooseService = MongooseService;
MongooseService.mongoConnection = undefined;
