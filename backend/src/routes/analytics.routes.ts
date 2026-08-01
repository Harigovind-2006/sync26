import { Router } from "express";
import { getUserAnalyticsHandler } from "../controllers/analytics.controller";

const router = Router();

router.get("/dashboard", getUserAnalyticsHandler);

export default router;
