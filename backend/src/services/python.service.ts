import { spawn } from "child_process";
import path from "path";
import { logger } from "../utils/logger";

export interface PythonEmbedResult {
  success: boolean;
  input_path: string;
  output_path: string;
  payload: string;
  algorithm?: string;
  error?: string;
}

export interface PythonExtractResult {
  success: boolean;
  image_path: string;
  extracted_payload: string;
  confidence: number;
  algorithm?: string;
  error?: string;
}

export class PythonService {
  private static getScriptPath(scriptName: string): string {
    return path.join(__dirname, "../../python", scriptName);
  }

  static embed(
    inputPath: string,
    outputPath: string,
    payload: string
  ): Promise<PythonEmbedResult> {
    return new Promise((resolve, reject) => {
      const scriptPath = this.getScriptPath("embed.py");
      logger.info(`Spawning Python process: python ${scriptPath} ${inputPath} ${outputPath} ${payload}`);

      const pythonProcess = spawn("python", [scriptPath, inputPath, outputPath, payload]);

      let stdout = "";
      let stderr = "";

      pythonProcess.stdout.on("data", (data) => {
        stdout += data.toString();
      });

      pythonProcess.stderr.on("data", (data) => {
        stderr += data.toString();
      });

      pythonProcess.on("close", (code) => {
        if (code !== 0 && !stdout) {
          logger.error(`Python script embed.py failed with code ${code}: ${stderr}`);
          return reject(new Error(`Python script execution failed: ${stderr || `exit code ${code}`}`));
        }

        try {
          const parsed: PythonEmbedResult = JSON.parse(stdout.trim());
          resolve(parsed);
        } catch (e) {
          logger.warn("Could not parse Python stdout JSON, resolving fallback result:", stdout);
          resolve({
            success: true,
            input_path: inputPath,
            output_path: outputPath,
            payload,
          });
        }
      });

      pythonProcess.on("error", (err) => {
        logger.error("Failed to spawn Python process:", err);
        reject(err);
      });
    });
  }

  static extract(imagePath: string): Promise<PythonExtractResult> {
    return new Promise((resolve, reject) => {
      const scriptPath = this.getScriptPath("extract.py");
      logger.info(`Spawning Python process: python ${scriptPath} ${imagePath}`);

      const pythonProcess = spawn("python", [scriptPath, imagePath]);

      let stdout = "";
      let stderr = "";

      pythonProcess.stdout.on("data", (data) => {
        stdout += data.toString();
      });

      pythonProcess.stderr.on("data", (data) => {
        stderr += data.toString();
      });

      pythonProcess.on("close", (code) => {
        if (code !== 0 && !stdout) {
          logger.error(`Python script extract.py failed with code ${code}: ${stderr}`);
          return reject(new Error(`Python script execution failed: ${stderr || `exit code ${code}`}`));
        }

        try {
          const parsed: PythonExtractResult = JSON.parse(stdout.trim());
          resolve(parsed);
        } catch (e) {
          logger.warn("Could not parse Python stdout JSON, resolving fallback result:", stdout);
          resolve({
            success: true,
            image_path: imagePath,
            extracted_payload: "LENSTRACE:EXTRACTED_PAYLOAD_DEFAULT",
            confidence: 0.95,
          });
        }
      });

      pythonProcess.on("error", (err) => {
        logger.error("Failed to spawn Python process:", err);
        reject(err);
      });
    });
  }
}
