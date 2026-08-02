import { supabase } from "../config/supabase";
import { BreachReport, CreateBreachReportDTO } from "../models/breach";
import { BlockchainService } from "./blockchain.service";
import { v4 as uuidv4 } from "uuid";

export class BreachService {
  static async createReport(
    imageId: string,
    suspectUrl: string,
    confidence: number = 0.95
  ): Promise<BreachReport> {
    const breachId = uuidv4();
    const txHash = await BlockchainService.flagBreach(breachId, suspectUrl);

    const dto: CreateBreachReportDTO = {
      image_id: imageId,
      suspect_url: suspectUrl,
      match_confidence: confidence,
      detection_source: 'Manual AI Scan',
      status: 'flagged',
      blockchain_tx: txHash,
    };

    const { data, error } = await supabase
      .from("breach_reports")
      .insert([{ id: breachId, ...dto }])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error for breach_reports table:", error);
      return { id: breachId, ...dto };
    }

    // Automatically update the parent image's status to 'alert'
    const { error: updateError } = await supabase.from("images").update({ status: 'alert' }).eq('id', imageId);
    if (updateError) {
      console.error("Supabase update error for images table:", updateError);
    }

    return data as BreachReport;
  }

  static async getAllReports(): Promise<BreachReport[]> {
    const { data, error } = await supabase
      .from("breach_reports")
      .select("*")
      .order("detected_at", { ascending: false });

    if (error) {
      return [];
    }

    return (data || []) as BreachReport[];
  }
}
