interface entitlementObj {
  expires_date?: string;
  grace_period_expires_date?: string;
  purchase_date?: string;
  product_identifier?: string;
}

type store =
  | "app_store"
  | "mac_app_store"
  | "play_store"
  | "amazon"
  | "stripe"
  | "promotional";

interface subscriptionObj {
  expires_date?: string;
  purchase_date?: string;
  original_purchase_date?: string;
  ownership_type?: "PURCHASED" | "FAMILY_SHARED";
  period_type?: "normal" | "trial" | "intro";
  store?: store;
  is_sandbox?: boolean;
  unsubscribe_detected_at?: string;
  billing_issues_detected_at?: string;
  grace_period_expires_date?: string;
  refunded_at?: string;
  auto_resume_date?: string;
}

interface nonSubscriptionObj {
  id?: string;
  purchase_date?: string;
  store?: store;
  is_sandbox?: boolean;
}

interface RevenueCatSubscriber {
  entitlements: { [entId: string]: entitlementObj };
  first_seen: string;
  last_seen: string;
  management_url: null;
  non_subscriptions: { [productId: string]: nonSubscriptionObj };
  original_app_user_id: string;
  original_application_version: null;
  original_purchase_date: null;
  other_purchases: {};
  subscriptions: { [productId: string]: subscriptionObj };
}

export interface GetSubscriber {
  request_date: string;
  request_date_ms: number;
  subscriber: RevenueCatSubscriber;
}
