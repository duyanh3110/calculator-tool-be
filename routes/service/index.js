import { Router } from "express";
import ServiceController from "../../controllers/service.controller.js";

const ServiceRouter = Router();

ServiceRouter.get("/services", ServiceController.getServices);

ServiceRouter.post("/services", ServiceController.postServices);

ServiceRouter.delete("/services/:id", ServiceController.deleteServices);

export default ServiceRouter;
