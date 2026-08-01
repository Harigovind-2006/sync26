import { Router } from "express";
import { ImageController } from "../controllers/image.controller";
import { authenticateJwt } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";

const router = Router();

router.use(authenticateJwt);

router.post("/upload", upload.single("image"), ImageController.upload);
router.get("/", ImageController.getAll);
router.get("/:id", ImageController.getById);
router.delete("/:id", ImageController.delete);

export default router;
