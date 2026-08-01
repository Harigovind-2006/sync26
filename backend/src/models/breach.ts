export interface BreachReport {
  id: string;
  license_id: string;
  suspect_url: string;
  confidence: number;
  extracted_payload: string;
  blockchain_tx?: string | null;
  created_at?: string;
}

export type CreateBreachReportDTO = Omit<BreachReport, "id" | "created_at">;
