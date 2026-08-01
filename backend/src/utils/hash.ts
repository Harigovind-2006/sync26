import bcrypt from "bcrypt";
import crypto from "crypto";
import fs from "fs";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (
  plainText: string,
  hashed: string
): Promise<boolean> => {
  return await bcrypt.compare(plainText, hashed);
};

export const generateSHA256 = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(filePath);

    stream.on("data", (data) => hash.update(data));
    stream.on("end", () => resolve(hash.digest("hex")));
    stream.on("error", (err) => reject(err));
  });
};
