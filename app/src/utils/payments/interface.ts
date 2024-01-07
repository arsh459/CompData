export interface RazorpaySubscription {
  id: string;
  entity: string;
  plan_id: string;
  customer_id: string;
  status:
    | "active"
    | "created"
    | "authenticated"
    | "pending"
    | "halted"
    | "cancelled"
    | "completed"
    | "expired"; // check
  current_start: number;
  current_end: number;
  ended_at?: null;
  quantity: number;

  charge_at: number;
  start_at: number;
  end_at: number;
  auth_attempts: number;
  total_count: number;
  paid_count: number;
  customer_notify: boolean;
  created_at: number;
  expire_by: number;
  short_url: string;
  has_scheduled_changes: boolean;
  change_scheduled_at?: null;
  source: "api";
  offer_id: string;
  remaining_count: number;
}
