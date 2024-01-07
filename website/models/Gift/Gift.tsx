import { AppSubscription } from "@models/AppSubscription/AppSubscription";

export interface Gift {
  fromName: string;
  fromUID: string;
  fromEmail: string;
  unix: number;

  plan?: AppSubscription;
  id: string;

  toName: string;
  toMessage: string;

  status?: "REDEEMED" | "PAID";
}
