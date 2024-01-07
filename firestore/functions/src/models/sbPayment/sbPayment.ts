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

export interface sbEventPayment extends RazorpayPayment {
  razorpay_signature: string;
  baseOrderId: string;
  eventId: string;
  eventName: string;
  ownerUID: string;
  cohortId?: string;
  uid?: string;
}

export interface SbRazorPayment extends RazorpayPayment {
  sprintId: string;
}
