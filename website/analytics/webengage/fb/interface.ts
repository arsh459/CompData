export interface FBUserData_SB {
  uid: string;
  db?: string;
  ct?: string;
  st?: string;
  zp?: string;
  country?: string;
  external_id: string;
  client_ip_address: string;
  client_user_agent?: string;
  fbc?: string;
  fbp?: string;

  // app only
  anon_id?: string;
  madid?: string;
}

export type actionSourceTypes =
  | "website"
  | "email"
  | "app"
  | "phone_call"
  | "chat"
  | "physical_store"
  | "system_generated"
  | "other";

export type appType = "a2" | "i2";
export const extLength = 16;

export interface FBEventInterfaceRequest {
  event_name: STANDARD_FB_EVENTS;
  event_time: number;
  user_data: FBUserData_SB;
  event_source_url: string;
  event_id: string;
  action_source: actionSourceTypes;
  data_processing_options: string[];

  mixpanelDistinctId: string;
  custom_data?: { [key: string]: string | number };

  // not present on web
  //   app_data?: FBAppData;
}

export type STANDARD_FB_EVENTS =
  | "Schedule" // slot booking
  | "Lead" // onboarding
  | "CompleteRegistration" // signup
  | "InitiateCheckout" // pay request
  | "Purchase"; // payment
