import { Router } from "express";
import { 
  getOwnershipLedgerHandler, 
  updateCoOwnersHandler, 
  transferOwnershipHandler, 
  executePayoutHandler 
} from "../controllers/ownership.controller";

const router = Router();

router.get("/:assetId", getOwnershipLedgerHandler);
router.post("/co-owners", updateCoOwnersHandler);
router.post("/transfer", transferOwnershipHandler);
router.post("/payout", executePayoutHandler);

export default router;
