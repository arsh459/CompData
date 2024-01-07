import { useEffect, useState } from "react";
import axios from "axios";
import crashlytics from "@react-native-firebase/crashlytics";
import { RazorpaySubscription } from "@utils/payments/interface";
import { subscriptionStatus } from "./useSubscription";

interface razorPayResponse {
  subscriptions: { [id: string]: RazorpaySubscription };
}

export const useRemotePlans = (
  // plans?: AppSubscription[],
  uid?: string,
  userRazorSubscriptions?: string[]
) => {
  const [currentStatus, setStatus] = useState<subscriptionStatus>("PENDING");
  const [daysLeft, setDaysLeft] = useState<number>(-1);

  useEffect(() => {
    const getRemotePlans = async () => {
      if (uid) {
        try {
          const razorPlans = await axios({
            url: "https://www.socialboat.live/api/sub",
            method: "GET",
            params: {
              razorpayIds: userRazorSubscriptions ? userRazorSubscriptions : [],
            },
          });

          const razorPayPlans = razorPlans.data as razorPayResponse | undefined;

          let status: boolean = false;
          if (razorPayPlans?.subscriptions) {
            for (const plan of Object.values(razorPayPlans.subscriptions)) {
              // if plan is active
              if (plan.status === "active" || plan.status === "authenticated") {
                let ending: number = 0;
                if (plan.current_end) {
                  ending = plan.current_end;
                } else if (plan.charge_at) {
                  ending = plan.charge_at + 30 * 24 * 60 * 60;
                } else {
                  ending = plan.created_at + 30 * 24 * 60 * 60;
                }

                ending = ending * 1000;

                const now = Date.now();

                const days = Math.ceil((ending - now) / (24 * 60 * 60 * 1000));
                setStatus("SUBSCRIBED");
                setDaysLeft(days);
                status = true;
                break;
              }
            }
          }

          // else {
          if (!status) {
            setDaysLeft(0);
            setStatus("EXPIRED");
          }
        } catch (error: any) {
          console.log("error in useRemotePlans", error);
          crashlytics().recordError(error);
        }
        // }
      }
    };

    getRemotePlans();
  }, [userRazorSubscriptions, uid]);

  return {
    daysLeft,
    currentStatus,
  };
};

// days left
// subscription status
