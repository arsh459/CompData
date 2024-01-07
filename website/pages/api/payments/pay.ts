// import { handleSearchQuery } from "@util/algolia/handleSearchQuery";
// import { parseQuery } from "@util/algolia/parse";
import type { NextApiRequest, NextApiResponse } from "next";
import { createOrder } from "../../../utils/payments/createOrder";
import { getEventById } from "@utils/payments/getEvent";
import { RazorpayOrder } from "@utils/payments/interface";
import { parsePayQuery } from "@utils/payments/parsePayQuery";
import { withSentry } from "@sentry/nextjs";
import {
  getGameCost,
  getSubscriptionPlan,
} from "server/payments/getSubscriptionPlan";

const payRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { eventId, discount, subscriptionId } = parsePayQuery(req.query);
      console.log(
        "eventId",
        eventId,
        "discount",
        discount,
        "subscriptionId",
        subscriptionId
      );

      if (eventId) {
        // get event
        const remoteEvent = await getEventById(eventId);

        console.log("remoteEvent", remoteEvent?.name);

        if (remoteEvent) {
          const plan = getSubscriptionPlan(remoteEvent, subscriptionId);

          console.log("plan", plan?.id, plan?.cost);

          if (plan) {
            const cost = getGameCost(plan, discount);

            console.log("cost", cost);
            try {
              await createOrder(
                Math.round(cost),
                plan.currency,
                (_: any, order: RazorpayOrder) => {
                  console.log("order", order);
                  res.status(200).json({
                    ...order,
                  });

                  return;
                },
                "uid",
                "phone",
                "name",
                []
              );
            } catch (error) {
              console.log("error", error);
            }
          }
        } else {
          res.status(400).json({
            status: "failed",
          });
        }
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

export default withSentry(payRequest);
