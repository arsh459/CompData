import {
  SubscriptionPlan,
  payPerViewPlan,
  paymentMethods,
} from "@models/PaymentMethods";

export const subPlans: SubscriptionPlan[] = [
  {
    amount: 49,
    currency: "₹",
    sessions: 5,
    duration: -1,
    name: "Starter",
  },
  {
    amount: 99,
    currency: "₹",
    sessions: 12,
    duration: -1,
    name: "Pro",
  },
];

const payPlan: payPerViewPlan = {
  name: "4pm, 12Jan class",
  amount: 49,
  currency: "₹",
};

export const paymentMethodsLeft = [
  {
    text: "Charge custom subscription plans",
    heading: "Create your subscription plan",
    method: "subscription",
    subPlans: subPlans,
    widgetHeading: "Subscription",
    paymentMethod: ["GPay"] as paymentMethods[],
  },
  {
    text: "Users unlock videos post payment",
    heading: "Price each video",
    method: "payPerView",
    plan: payPlan,
    widgetHeading: "Pay per view",
    paymentMethod: ["PayTM"] as paymentMethods[],
  },
  // {
  //   text: "Let customers pay what they like",
  //   heading: "Sponsor",
  // },
];

export const prelaunch = {
  text: "Have a skill & want to drive impact? Teach your passion & donate to a cause",
  heading: "Host a fundraiser. With yout talent",
  widgetHeading: "Sponsor passion",
};

export const paymentMethodsRight = [
  {
    text: "Have a dream project? Start a campaign and raise funds",
    heading: "Pre launch",
    method: "",
    widgetHeading: "Sponsor passion",
  },
  // {
  //   text: "Give away some videos for free, rest are paid",
  //   heading: "Freemium",
  // },
  // {
  //   text: "Reward your super fans with special discounts",
  //   heading: "Discount vouchers",
  //   method: "",
  //   widgetHeading: "Discount Vouchers",
  // },
];
