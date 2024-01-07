import { useEffect, useState } from "react";
import axios from "axios";
// import { AppSubscription } from "@models/AppSubscription/AppSubscription";
import { RazorpaySubscription } from "@utils/payments/interface";
import { subscriptionStatus } from "./useSubscription";
import { pastUserSubscribers } from "@constants/subscribersList";

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
    // console.log("getRemotePlans");
    const getRemotePlans = async () => {
      if (
        uid &&
        pastUserSubscribers[uid] &&
        pastUserSubscribers[uid] > Date.now()
      ) {
        setStatus("SUBSCRIBED");
        const d = Math.ceil(
          (pastUserSubscribers[uid] - Date.now()) / (24 * 60 * 60 * 1000)
        );
        setDaysLeft(d);

        return;
      } else if (uid) {
        const razorPlans = await axios({
          url: "/api/sub",
          method: "GET",
          params: {
            razorpayIds: userRazorSubscriptions ? userRazorSubscriptions : [],
          },
        });

        const razorPayPlans = razorPlans.data as razorPayResponse | undefined;
        // console.log("razorPayPlans", razorPayPlans, userRazorSubscriptions);

        let status: boolean = false;
        if (razorPayPlans?.subscriptions) {
          for (const plan of Object.values(razorPayPlans.subscriptions)) {
            // console.log("plan", plan);
            // console.log("plan", plan.status);
            // if plan is active
            if (
              plan.status === "active" ||
              plan.status === "authenticated" ||
              plan.status === "completed"
            ) {
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
