import { Router } from "express";
import { LicenseController } from "../controllers/license.controller";
import { authenticateJwt } from "../middleware/auth.middleware";

const router = Router();

// Public read routes
router.get("/", LicenseController.getAll);
router.get("/:id", LicenseController.getById);

// Protected write routes
router.post("/", authenticateJwt, LicenseController.create);

export default router;
