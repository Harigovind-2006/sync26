import { supabase } from "../config/supabase";
import { BreachReport, CreateBreachReportDTO } from "../models/breach";
import { BlockchainService } from "./blockchain.service";
import { v4 as uuidv4 } from "uuid";

export class BreachService {
  static async createReport(
    licenseId: string | undefined,
    suspectUrl: string,
    confidence: number = 0.95,
    extractedPayload: string = ""
  ): Promise<BreachReport> {
    const breachId = uuidv4();
    const txHash = await BlockchainService.flagBreach(breachId, suspectUrl);

    const dto: CreateBreachReportDTO = {
      license_id: licenseId || uuidv4(),
      suspect_url: suspectUrl,
      confidence,
      extracted_payload: extractedPayload,
      blockchain_tx: txHash,
    };

    const { data, error } = await supabase
      .from("breach_reports")
      .insert([{ id: breachId, ...dto }])
      .select()
      .single();

    if (error) {
      return { id: breachId, ...dto };
    }

    return data as BreachReport;
  }

  static async getAllReports(): Promise<BreachReport[]> {
    const { data, error } = await supabase
      .from("breach_reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return [];
    }

    return (data || []) as BreachReport[];
  }
}
