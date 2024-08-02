import { Router } from "express";
import cors from "cors";
import ServiceRouter from "./service/index.js";

const router = Router();

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

router.use("/v1/api", cors(corsOptionsDelegate), ServiceRouter);

export default router;
