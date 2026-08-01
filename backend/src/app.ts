import express, { Application, Request, Response } from "express";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.routes";
import imageRoutes from "./routes/image.routes";
import watermarkRoutes from "./routes/watermark.routes";
import licenseRoutes from "./routes/license.routes";
import breachRoutes from "./routes/breach.routes";
import { errorMiddleware } from "./middleware/error.middleware";

const app: Application = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const uploadsPath = path.join(__dirname, "../uploads");
app.use("/uploads", express.static(uploadsPath));

app.get("/", (_req: Request, res: Response) => {
  res.json({
    name: "LensTrace AI Digital Copyright Protection API",
    version: "1.0.0",
    status: "online",
    timestamp: new Date().toISOString(),
  });
});

app.use("/auth", authRoutes);
app.use("/images", imageRoutes);
app.use("/watermark", watermarkRoutes);
app.use("/licenses", licenseRoutes);
app.use("/breaches", breachRoutes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, error: "Resource Not Found" });
});

app.use(errorMiddleware);

export default app;
