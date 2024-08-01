import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import { writeFileSync, readFileSync } from "fs";
import { formatDate, createDataFile } from "./utils.js";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowList = [
    "https://calculator-tool-nail.netlify.app",
    "localhost:5173",
];

const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (allowList.indexOf(req.header("Origin")) !== -1) {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
};

const formatDateStr = formatDate();
const fileName = `${formatDateStr}.json`;
const dataPath = `./db/${fileName}`;

app.get("/v1/api/files", cors(corsOptionsDelegate), async (req, res) => {
    await createDataFile("db", fileName);
    res.status(200).send("OK");
});

app.get("/v1/api/services", cors(corsOptionsDelegate), (req, res) => {
    let data = readFileSync(dataPath, { encoding: "utf8", flag: "r" });
    res.status(200).json(JSON.parse(data));
});

app.post("/v1/api/services", cors(corsOptionsDelegate), (req, res) => {
    const newService = req.body;
    newService.id = uuidv4();

    let data = readFileSync(dataPath, { encoding: "utf8", flag: "r" });
    const newData = JSON.parse(data);
    newData.push(newService);

    writeFileSync(dataPath, JSON.stringify(newData, null, 2), "utf8");

    res.status(200).json(newService);
});

app.delete("/v1/api/services/:id", cors(corsOptionsDelegate), (req, res) => {
    let data = readFileSync(dataPath, { encoding: "utf8", flag: "r" });
    let newData = JSON.parse(data);
    newData = newData.filter((data) => data.id !== req.params.id);

    writeFileSync(dataPath, JSON.stringify(newData, null, 2), "utf8");

    res.status(200).json("OK");
});

app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
});
