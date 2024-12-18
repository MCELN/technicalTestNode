import mongoose from "mongoose";
import config from "../config";

class MongoConnection {
    static #instance: MongoConnection | undefined;

    constructor() {
        this.connect();
    }

    async connect() {
        try {
            await mongoose.connect(
                config.MONGODB_URI
            );
            console.log(`MongoDB connected`);
        } catch (error) {
            console.error(`${error} The connection to the database could not be established`);
        };
    };

    static getInstance() {
        if(this.#instance) return this.#instance;

        this.#instance = new MongoConnection();
        return this.#instance;
    };
};

export default MongoConnection;
