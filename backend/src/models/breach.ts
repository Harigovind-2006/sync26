export interface BreachReport {
  id: string;
  image_id: string;
  suspect_url: string;
  detection_source?: string | null;
  match_confidence?: number | null;
  status?: string | null;
  blockchain_tx?: string | null;
  detected_at?: string;
}

export type CreateBreachReportDTO = Omit<BreachReport, "id" | "detected_at">;
