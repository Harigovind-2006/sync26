import app from "./app";
import { config } from "./config/env";
import { logger } from "./utils/logger";

const PORT = config.PORT;

const server = app.listen(PORT, () => {
  logger.info(`Laxman Rekha API Backend running on port ${PORT}`);
});

process.on("unhandledRejection", (reason: Error) => {
  logger.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (error: Error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});

export default server;
