// import { handleSearchQuery } from "@util/algolia/handleSearchQuery";
// import { parseQuery } from "@util/algolia/parse";
import type { NextApiRequest, NextApiResponse } from "next";
import { createOrder } from "../../../utils/payments/createOrder";
// import { getAppSubscription } from "@utils/payments/getEvent";
import { RazorpayOrder } from "@utils/payments/interface";
import {
  // parsePayQuery,
  parsePaySubscriptionQueryV2,
} from "@utils/payments/parsePayQuery";
import { withSentry } from "@sentry/nextjs";

const paySubscriptionV2 = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { appSubId, cost, uid, phone, name, currency, offers } =
        parsePaySubscriptionQueryV2(req.query);

      if (appSubId) {
        // get event
        // const subscription = await getAppSubscription(appSubId);

        // console.log("remoteEvent", remoteEvent?.name);

        // if (subscription) {
        // const plan = getSubscriptionPlan(remoteEvent, subscriptionId);

        // console.log("plan", plan?.id, plan?.cost);

        // if (plan) {
        //   const cost = subscription.cost;
        //   const disc = cost * (discount / 100);
        //   const currency = subscription.currency;

        // console.log("cost", cost, discount, disc);
        try {
          await createOrder(
            currency === "INR" ? Math.round(cost) : cost,
            currency,
            (_: any, order: RazorpayOrder) => {
              console.log("order", order);
              res.status(200).json({
                ...order,
              });

              return;
            },
            uid,
            phone,
            name,
            offers
          );
        } catch (error) {
          console.log("error", error);
        }
        // }
        // } else {
        //   res.status(400).json({
        //     status: "failed",
        //   });
        // }
      }
    } else {
      res.status(400).json({
        status: "failed",
      });
    }
  } catch (err) {
    console.log("error in server", err);
    res.status(400).json({ error: "error" });
  }
};

export default withSentry(paySubscriptionV2);
