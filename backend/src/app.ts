import express, { Application, Request, Response } from "express";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.routes";
import imageRoutes from "./routes/image.routes";
import watermarkRoutes from "./routes/watermark.routes";
import licenseRoutes from "./routes/license.routes";
import breachRoutes from "./routes/breach.routes";
import ownershipRoutes from "./routes/ownership.routes";
import blockRoutes from "./routes/block.routes";
import analyticsRoutes from "./routes/analytics.routes";
import { errorMiddleware } from "./middleware/error.middleware";

const app: Application = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const uploadsPath = path.join(__dirname, "../uploads");
app.use("/uploads", express.static(uploadsPath));

app.get("/", (_req: Request, res: Response) => {
  res.json({
    name: "Laxman Rekha AI Digital Copyright Protection API",
    version: "2.4.1",
    status: "online",
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: "/auth (POST /signup, POST /login)",
      images: "/images (POST /upload, GET /)",
      watermark: "/watermark (POST /embed, POST /extract)",
      licenses: "/licenses (POST /issue, GET /)",
      breaches: "/breaches (POST /report, GET /)",
      ownership: "/ownership (GET /:assetId, POST /co-owners, POST /transfer, POST /payout)",
      block: "/block (POST /image, POST /unblock, GET /list, GET /status/:imageId)",
      analytics: "/analytics (GET /dashboard)"
    }
  });
});

app.use("/auth", authRoutes);
app.use("/images", imageRoutes);
app.use("/watermark", watermarkRoutes);
app.use("/licenses", licenseRoutes);
app.use("/breaches", breachRoutes);
app.use("/ownership", ownershipRoutes);
app.use("/block", blockRoutes);
app.use("/analytics", analyticsRoutes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, error: "Resource Not Found" });
});

app.use(errorMiddleware);

export default app;
