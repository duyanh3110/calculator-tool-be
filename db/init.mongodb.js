import mongoose from "mongoose";
import config from "../configs/config.mongodb.js";
import { countConnect } from "../helpers/check.connect.js";

const {
    db: { user, password, url, appName },
} = config;
const connectString = `mongodb+srv://${user}:${password}@${url}/?retryWrites=true&w=majority&appName=${appName}`;

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        // Set when env = dev
        mongoose.set("debug", true);
        mongoose.set("debug", { color: true });

        mongoose
            .connect(connectString)
            .then((_) => {
                console.log(`Connected Mongodb Success `);
                countConnect();
            })
            .catch((err) => console.log("Error connecting ::: ", err));
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

export const instanceMongodb = Database.getInstance();
