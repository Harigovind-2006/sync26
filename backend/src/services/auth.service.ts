import { BuyerService } from "./buyer.service";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { Buyer } from "../models/buyer";

export class AuthService {
  static async register(dto: {
    name: string;
    email: string;
    password: string;
    wallet_address?: string;
  }): Promise<{ buyer: Omit<Buyer, "password_hash">; token: string }> {
    const existing = await BuyerService.findByEmail(dto.email);
    if (existing) {
      throw new Error("A buyer account with this email already exists.");
    }

    const password_hash = await hashPassword(dto.password);

    const buyer = await BuyerService.createBuyer({
      name: dto.name,
      email: dto.email,
      password_hash,
      wallet_address: dto.wallet_address || null,
    });

    const token = generateToken({
      id: buyer.id,
      email: buyer.email,
      name: buyer.name,
    });

    const { password_hash: _, ...buyerWithoutPassword } = buyer;

    return { buyer: buyerWithoutPassword, token };
  }

  static async login(dto: {
    email: string;
    password: string;
  }): Promise<{ buyer: Omit<Buyer, "password_hash">; token: string }> {
    const buyer = await BuyerService.findByEmail(dto.email);
    if (!buyer) {
      throw new Error("Invalid email or password.");
    }

    const isValid = await comparePassword(dto.password, buyer.password_hash);
    if (!isValid) {
      throw new Error("Invalid email or password.");
    }

    const token = generateToken({
      id: buyer.id,
      email: buyer.email,
      name: buyer.name,
    });

    const { password_hash: _, ...buyerWithoutPassword } = buyer;

    return { buyer: buyerWithoutPassword, token };
  }

  static async getProfile(id: string): Promise<Omit<Buyer, "password_hash">> {
    const buyer = await BuyerService.findById(id);
    if (!buyer) {
      throw new Error("Buyer profile not found.");
    }

    const { password_hash: _, ...buyerWithoutPassword } = buyer;
    return buyerWithoutPassword;
  }
}
