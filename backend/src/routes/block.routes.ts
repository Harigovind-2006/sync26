import { Router } from "express";
import { 
  blockImageHandler, 
  unblockImageHandler, 
  getBlockedImagesHandler, 
  getBlockStatusHandler 
} from "../controllers/block.controller";

const router = Router();

router.post("/image", blockImageHandler);
router.post("/unblock", unblockImageHandler);
router.get("/list", getBlockedImagesHandler);
router.get("/status/:imageId", getBlockStatusHandler);

export default router;
