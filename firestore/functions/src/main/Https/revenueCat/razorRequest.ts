export interface RazorpayRequestInterface {
  event: "payment.authorized" | "payment.captured";
  payload: RazorpayPayload;
}

interface RazorpayPayload {
  payment?: RazorpayPaymentEntity;
}

interface RazorpayPaymentEntity {
  entity?: PaymentInterface;
}

interface PaymentInterface {
  id?: string;
  amount?: number;
  currency?: string;
  order_id?: string;
  email?: string;
  contact?: string;
}
