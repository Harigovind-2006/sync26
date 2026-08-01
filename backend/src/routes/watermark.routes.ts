import { Router } from "express";
import { WatermarkController } from "../controllers/watermark.controller";
import { authenticateJwt } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";

const router = Router();

router.use(authenticateJwt);

router.post("/embed", upload.single("image"), WatermarkController.embed);
router.post("/extract", upload.single("image"), WatermarkController.extract);

export default router;
