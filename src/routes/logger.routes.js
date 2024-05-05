import { Router } from "express";
import LogCtrl from "../controllers/logger.controler.js";

const loggerRouter = Router()
const loggerCtrl = new LogCtrl();

loggerRouter.get("/", loggerCtrl.getLogger);
loggerRouter.get("/warn", loggerCtrl.testWarn);
loggerRouter.get("/error", loggerCtrl.testError);
loggerRouter.get("/:input", loggerCtrl.testInput);

export default loggerRouter;