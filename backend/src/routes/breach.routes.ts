import { Router } from "express";
import { BreachController } from "../controllers/breach.controller";
import { authenticateJwt } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticateJwt);

router.post("/", BreachController.create);
router.get("/", BreachController.getAll);

export default router;
