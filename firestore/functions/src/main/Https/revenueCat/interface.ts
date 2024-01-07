export interface RevenueCatRequest {
  api_version?: string;
  event?: RevenueCatEvent;
}

interface RevenueCatEvent {
  app_id?: string;
  app_user_id?: string;
  currency?: string;
  id?: string;
  price?: number | null;
  product_id?: string;
  store?: string;
  type?:
    | "TEST"
    | "INITIAL_PURCHASE"
    | "NON_RENEWING_PURCHASE"
    | "RENEWAL"
    | "PRODUCT_CHANGE"
    | "CANCELLATION"
    | "BILLING_ISSUE"
    | "SUBSCRIBER_ALIAS"
    | "SUBSCRIPTION_PAUSED"
    | "UNCANCELLATION"
    | "TRANSFER";
}
