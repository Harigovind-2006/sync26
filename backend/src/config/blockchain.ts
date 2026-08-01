import { ethers } from "ethers";
import { config } from "./env";

export const provider = new ethers.JsonRpcProvider(config.POLYGON_RPC);

export const getWallet = (): ethers.Wallet => {
  return new ethers.Wallet(config.PRIVATE_KEY, provider);
};
