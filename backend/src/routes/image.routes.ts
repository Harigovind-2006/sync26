import { Router } from "express";
import { ImageController } from "../controllers/image.controller";
import { authenticateJwt } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";

const router = Router();

// Public read routes — no auth required for dashboard/analytics views
router.get("/", ImageController.getAll);
router.get("/:id", ImageController.getById);

// Protected write routes — require JWT
router.post("/upload", authenticateJwt, upload.single("image"), ImageController.upload);
router.delete("/:id", authenticateJwt, ImageController.delete);

export default router;
