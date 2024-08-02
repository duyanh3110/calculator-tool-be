import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import { instanceMongodb } from "./db/init.mongodb.js";
import router from "./routes/index.js";

const app = express();
const port = 3000;
const db = instanceMongodb;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
});
