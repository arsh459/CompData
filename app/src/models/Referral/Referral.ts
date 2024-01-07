// /referrals/uid
export interface Referral {
  referredBy: string; // uid of person referring
  unix: number;
  id: string;

  userName?: string;
  userPhone: string;
}
