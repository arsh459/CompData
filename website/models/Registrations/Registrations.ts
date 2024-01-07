export interface Registration {
  id: string;
  name?: string;
  phone: string;
  email?: string;

  eventId: string;
  eventName?: string;

  amount?: string;
  currency?: string;
  registrationType: "paid" | "invite";

  createdOn: number;
  paymentId: string;
  orderId: string;

  cohortId?: string;
  cohortName?: string;

  userUid?: string;
}
