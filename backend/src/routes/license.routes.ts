import { Router } from "express";
import { LicenseController } from "../controllers/license.controller";
import { authenticateJwt } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticateJwt);

router.post("/", LicenseController.create);
router.get("/", LicenseController.getAll);
router.get("/:id", LicenseController.getById);

export default router;
