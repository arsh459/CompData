import { subscriptionStatus } from "@hooks/subscription/useSubscription";
// import { basicPlanDetails } from "@hooks/subscription/useSubscriptionV2";
import {
  AppSubscription,
  SbPlans,
  UserAppSubscription,
} from "@models/AppSubscription/AppSubscription";
import { Dispatch, SetStateAction } from "react";
import { CustomerInfo, PurchasesPackage } from "react-native-purchases";
// import { affirmationType } from "./hooks/useSubscription";

export type SubscriptionContextProps = {
  children: React.ReactNode;
  loaded: boolean;
};

export interface SubscriptionContextInterface {
  subStatus: subscriptionStatus;
  setRefresh: Dispatch<SetStateAction<number>>;
  subVisible: boolean;
  onShowModal: () => void;
  onCloseModal: () => void;
  // affirmation: affirmationType;
  sbplan?: SbPlans;
  packages: PurchasesPackage[];
  loading: boolean;
  makePurchase: (pack: PurchasesPackage) => Promise<CustomerInfo | undefined>;
  res: {
    daysLeft: number;
    currentStatus: subscriptionStatus;
    appPlan: AppSubscription | undefined;
    // basicPlan: basicPlanDetails | undefined;
    // basePlanStatus: subscriptionStatus;
    planIdentifyer?: string;
    msLeft: number;
    userSubscription: UserAppSubscription | undefined;
    purchaserInformation: CustomerInfo | undefined;
    planName?: string;
    planDescription?: string[];
  };
}
