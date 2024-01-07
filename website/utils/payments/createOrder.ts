import { razorInstance } from "./init";
import { RazorpayOrder } from "./interface";

export const createOrder = async (
  amount: number,
  currency: string,
  callback: (_: any, order: RazorpayOrder) => void,
  uid: string,
  phone: string,
  name: string,
  offers: string[]
) => {
  console.log("amount", amount, currency, razorInstance, razorInstance.orders);

  return razorInstance.orders.create(
    {
      // amount: 100,
      amount: amount * 100,
      currency: currency,
      notes: {
        uid,
        phone,
        name,
      },
      offers: offers,
    },
    callback
  );
};
