import { GetSubscriber } from "@models/RevenueCat/interface";
import { getUserAppSubscription } from "@utils/payments/getEvent";
import axios from "axios";

export const checkExpiry = async (uid: string) => {
  const now = Date.now();
  let expiry: number = -1;
  if (uid) {
    const response = await axios({
      url: `https://api.revenuecat.com/v1/subscribers/${uid}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + `${process.env.REVENUE_CAT}`,
      },
      data: {
        app_user_id: uid,
      },
    });

    const parsedResult = response.data as GetSubscriber;
    //   console.log("parsedResult", parsedResult);

    // subscribed

    if (parsedResult.subscriber && parsedResult.subscriber.entitlements) {
      for (const ent of Object.keys(parsedResult.subscriber.entitlements)) {
        const expiresDate =
          parsedResult.subscriber.entitlements[ent].expires_date;

        //   console.log(
        //     "parsedResult.subscriber.entitlements[ent].expires_date",
        //     ent,
        //     parsedResult.subscriber.entitlements[ent]
        //   );

        if (expiresDate) {
          const entExpiry = new Date(expiresDate).getTime();

          // console.log("entExpiry", entExpiry);

          if (entExpiry > now) {
            expiry = entExpiry;
          }
        }
      }
    }

    const userAppSubscription = await getUserAppSubscription(
      "0cPvVrnphNJBnvvOM9Zf",
      uid
    );

    //   console.log("userAppSubscription", userAppSubscription);

    if (
      userAppSubscription?.paidPeriodEndsOn &&
      userAppSubscription.paidPeriodEndsOn > now
    ) {
      if (userAppSubscription.paidPeriodEndsOn > expiry) {
        expiry = userAppSubscription.paidPeriodEndsOn;
      }
    }
  }

  return expiry;
};
