export interface RazorpayOrder {
  id: string;
  entity: "order";
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: "INR";
  receipt: string;
  offer_id: null | string;
  status: "created";
  attempts: number;
  notes: string[];
  created_at: number;
}

export interface SbRazorPayment extends RazorpayPayment {
  sprintId: string;
}

export interface RazorpayPayment {
  id: string;
  entity: "payment";
  amount: number;
  currency: "INR";
  status: "captured";
  order_id: string;
  invoice_id: null | string;
  international: boolean;
  method: "upi" | "card";
  amount_refunded: number;
  refund_status: null | string;
  captured: boolean;
  description: string;
  card_id: string | null;
  bank: string | null;
  wallet: string | null;
  vpa: string | null;
  email: string | null;
  contact: string | null;
  notes: string[];
  fee: number;
  tax: number;
  error_code: string | null;
  error_description: string | null;
  error_source: string | null;
  error_step: string | null;
  error_reason: string | null;
  acquirer_data: {
    rrn?: string;
    auth_code?: string;
  };
  created_at: number;
  plan_id?: string;
}

export interface AuthorizationRequest {
  orderId: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface sbEventPayment extends RazorpayPayment {
  razorpay_signature: string;
  baseOrderId: string;
  eventId: string;
  eventName: string;
  ownerUID: string;
  cohortId?: string;
  uid?: string;
}

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
