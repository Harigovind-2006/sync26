import { Router } from "express";
import { BreachController } from "../controllers/breach.controller";

const router = Router();

router.post("/report", BreachController.create);
router.post("/", BreachController.create);
router.get("/", BreachController.getAll);

export default router;
