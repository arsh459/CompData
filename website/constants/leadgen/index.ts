import { session } from "../organization/sessions";

export const baseImageKitURL =
  "https://ik.imagekit.io/socialboat/tr:w-1000,c-maintain_ratio,fo-auto";

export type sessionTypes = {
  title: string;
  subTitle: string;
  youtubeLink: string;
  width: string;
  height: string;
};

export type partnersTypes = { icon: string; text: string }[];
export type benifitsTypes = { icon: string; text: string; heading: string }[];
export type featuresTypes = { title: string; text: string; media: string }[];

export type aboutTypes = {
  title: string;
  subTitle: string;
  media: string;
  rating?: number;
};

// type leadTypes =
//   | "busyprofessionals"
//   | "PCOD"
//   | "weddingworkouts"
//   | "heartworkouts"
//   | "weightloss"
//   | "strenghtenback";

export type leadgenTypes = {
  hero: {
    title: string;
    subTitle: string;
    media: string;
    partners?: partnersTypes;
  };
  benifits: benifitsTypes;
  session: sessionTypes;
  features?: featuresTypes;
  about: aboutTypes;
};

const benifits: benifitsTypes = [
  {
    heading: "Free Consultation Call",
    icon: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Component_1_e_1TMecc_.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1656313371464",
    text: "Please fill up the form and our experts will connect to recommend customized programs",
  },
  {
    heading: "Free Nutrition Plan and benefits",
    icon: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Component_1_e_1TMecc_.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1656313371464",
    text: "Get a free nutrition plan based on your needs and additional incentives worth INR 10,000 every week!",
  },
  {
    heading: "AI powered tracking",
    icon: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Component_1_e_1TMecc_.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1656313371464",
    text: "Programs designed by India's top fitness experts, get live feedback and points by our fitness AI",
  },
  {
    heading: "Low Pricing",
    icon: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Component_1_e_1TMecc_.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1656313371464",
    text: "Prices starting as low as INR 200 a month",
  },
];

const about: aboutTypes = {
  title: "Workout on our app, Become a SB Athlete",
  subTitle:
    "While our experts call you, try out the SocialBoat Fitness app and enter the world of fitness, fun and rewards!",
  media: `https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,fo-auto/find-your-trainer-02_1_4XlM5vjwK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1660653692047`,
  rating: 4.9,
};

const busyprofessionals: leadgenTypes = {
  hero: {
    title: "BUSY LIFE leaving no time to workout?",
    subTitle:
      "Join our short 5 to 30 min HOME workout programs designed to keep you in shape. Signup for a FREE consultation call with our experts.",
    media: `${baseImageKitURL}/img_1_lead_gen__2__tLh0oYsLRc.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663958319932`,
  },
  benifits,
  session,
  about,
};

const PCOD: leadgenTypes = {
  hero: {
    title: "Workouts to keep PCOS in control",
    subTitle:
      "Join our HOME workouts designed to keep you active and reduce period cramps. Reduce your PCOS worries significantly. Signup for a FREE consultation call with our experts.",
    media: `${baseImageKitURL}/img_1_lead_gen_6191j9dN6A.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663958320268`,
  },
  benifits,
  session,
  about,
};

const weddingworkouts: leadgenTypes = {
  hero: {
    title: "Get in shape for your wedding",
    subTitle:
      "30 min daily HOME workouts and a nutrition plan to get you toned in 30 days. Signup for a FREE consultation call with our experts.",
    media: `${baseImageKitURL}/img_1_lead_gen__1__bC_rGlnQ2.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663958320859`,
  },
  benifits,
  session,
  about,
};

const heartworkouts: leadgenTypes = {
  hero: {
    title: "Workouts to keep Cholestrol and Diabetes in check",
    subTitle:
      "Keep your ailments in check by joining our daily Home workout programs. Signup for a FREE consultation call with our experts.",
    media: `${baseImageKitURL}/img_1_lead_gen__3__vZdetwO33.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663958312342`,
  },
  benifits,
  session,
  about,
};

const weightloss: leadgenTypes = {
  hero: {
    title: "Lose 5 kgs in 30 days",
    subTitle:
      "Join our 30 min daily home-program designed to help you loose weight. Signup for a FREE consultation call with our experts.",
    media: `${baseImageKitURL}/img_1_lead_gen__4__0TJ_JprCm.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663958314876`,
  },
  benifits,
  session,
  about,
};

const strenghtenback: leadgenTypes = {
  hero: {
    title: "Keep Chronic back issues in check.",
    subTitle:
      "Home workouts designed by top coaches that help you strengthen your back, powered by technology. Signup for a FREE consultation call with our experts.",
    media: `${baseImageKitURL}/img_1_lead_gen__5__zTHUwr3Vo.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663958319775`,
  },
  benifits,
  session,
  about,
};

export const leadgenObj: { [lead: string]: leadgenTypes } = {
  busyprofessionals,
  PCOD,
  weddingworkouts,
  heartworkouts,
  weightloss,
  strenghtenback,
};

// export const leadgenSelector = (lead?: string) => {
//   return lead && leadgen.hasOwnProperty(lead)
//     ? leadgen[lead as leadTypes]
//     : "404";
// };
