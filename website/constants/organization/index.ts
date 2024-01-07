import {
  aboutTypes,
  baseImageKitURL,
  benifitsTypes,
  leadgenTypes,
} from "@constants/leadgen";
import { AppSubscription } from "@models/AppSubscription/AppSubscription";
import {
  avivaFeatures,
  coach_ravinder_features,
  dufestFeatures,
  pecfestFeatures,
} from "./features";
// import {
//   // freePlan,
//   oneMonth_aviva,
//   oneMonth_student,
//   oneWeek_student,
//   oneYear_aviva,
//   sixMonth_aviva,
// } from "./plans";
import {
  avivaRewards,
  coach_ravinder_rewards,
  dufestRewards,
  pecfestRewards,
  rewardTypes,
} from "./rewards";
import { session, avivaSession, pecfestSession } from "./sessions";

export type orgTypes = {
  name: string;
  tags?: string[];
  plansTitle: string;
  heading?: string;
  headingBr?: string;
  // description: { [planId: string]: string[] };
  // discountPercent: number;
  orgIcon?: string;
  // freePlan?: boolean;
  plans: AppSubscription[];
  leadgen?: leadgenTypes;
  rewards?: rewardTypes;
  ctaText?: string;
  ctaText2?: string;
  ctaLink2?: string;
  rewardsHeading?: string;
  featuresHeading?: string;
};

const benifits: benifitsTypes = [];

const about: aboutTypes = {
  title: "Workout on our app, Become a SB Athlete",
  subTitle:
    "While our experts call you, try out the SocialBoat Fitness app and enter the world of fitness, fun and rewards!",
  media: `https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,fo-auto/find-your-trainer-02_1_4XlM5vjwK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1660653692047`,
  rating: 4.9,
};

const AVIVA: orgTypes = {
  name: "AVIVA India",
  tags: ["Achieve Fitness Goals", "Win Rewards", "AI Powered Home Workouts"],
  plansTitle: "Special Rates for AVIVA India Employees",
  plans: [], //[oneMonth_aviva, sixMonth_aviva, oneYear_aviva],
  leadgen: {
    hero: {
      title: "AVIVA India brings to you a home-transformation plan",
      subTitle:
        "AI powered workouts, nutrition and fitness goal tracking. Bought to you by AVIVA India in collaboration with SocialBoat.",
      media: `${baseImageKitURL}/Screenshot_2022-10-20_at_7.05_2_dO-C_amo7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666351065589`,
    },
    features: avivaFeatures,
    benifits,
    session: avivaSession,
    about,
  },
  rewards: avivaRewards,
  ctaText: "Make Me FIT",
  rewardsHeading: "Benefits",
  featuresHeading: "How to use",
};

const AIESECDU: orgTypes = {
  name: "AIESEC Delhi University",
  tags: ["Achieve Fitness Goals", "Win Rewards", "AI Powered Home Workouts"],
  plansTitle: "Special Rates for AIESEC Delhi University Students",
  plans: [], //[oneWeek_student],
  leadgen: {
    hero: {
      title: "The  Delhi University Fitness Olympics is here",
      subTitle:
        "Qualifiers: Nov 1 to Nov 5, 2022 \n Finals : Nov 6, 2022 - Conscient Sports, Vasant Kunj",
      media: `${baseImageKitURL}/Screenshot_2022-10-20_at_7.05_2_dO-C_amo7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666351065589`,
      partners: [
        {
          icon: "https://ik.imagekit.io/socialboat/tr:w-300,c-maintain_ratio,fo-auto/Asset_1_copy_1_XNdjgfi-U.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667216688855",
          text: "Venue Partner",
        },
        {
          icon: "https://ik.imagekit.io/socialboat/tr:w-300,c-maintain_ratio,fo-auto/remoteImage1_1_J9Z9hdLVX.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667216689155",
          text: "Marketing Partner",
        },
      ],
    },
    features: dufestFeatures,
    benifits,
    session,
    about,
  },
  rewards: dufestRewards,
  ctaText: "Lets go",
  ctaText2: "Join WhatsApp Community",
  ctaLink2: "https://chat.whatsapp.com/Fuq4DB66qqTCD8JWSfwLV7",
  rewardsHeading: "Rewards",
  featuresHeading: "How to participate",
};

const PECFEST: orgTypes = {
  heading: "Join Fitness Olympics at",
  headingBr: "PECFEST 22",
  name: "PECFEST",
  plansTitle: "Special Rates for PECFEST students",
  tags: ["Achieve Fitness Goals", "Win Rewards", "AI Powered Home Workouts"],
  plans: [], //[oneMonth_student],
  leadgen: {
    hero: {
      title: "The PECFEST Olympics is here",
      // subTitle: "Nov 7 to Nov 21",
      subTitle:
        "Qualifiers: Nov 1 to Nov 21, 2022 \n Finals : Nov 21, 2022 - Zoom",
      media: `${baseImageKitURL}/Screenshot_2022-10-20_at_7.05_2_dO-C_amo7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666351065589`,
    },
    features: pecfestFeatures,
    benifits,
    session: pecfestSession,
    about,
  },
  rewards: pecfestRewards,
  ctaText: "Lets go",
  ctaText2: "Join WhatsApp Community",
  ctaLink2: "https://chat.whatsapp.com/CihhtZI9ekx8dtyt6HCPJL",
  rewardsHeading: "Rewards",
  featuresHeading: "How to participate",
};

const getInfluencerObj = (name: string) => {
  return {
    ...AVIVA,
    leadgen: AVIVA.leadgen
      ? {
          ...AVIVA.leadgen,
          hero: {
            title: `The Most Advanced At Home Workouts. Join ${name}'s team on SocialBoat.`,
            subTitle: `AI powered workouts, nutrition and fitness goal tracking. Bought to you by ${name} in collaboration with SocialBoat.`,
            media: `${baseImageKitURL}/Screenshot_2022-10-20_at_7.05_2_dO-C_amo7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666351065589`,
          },
        }
      : undefined,
    name: name,
    plansTitle: `Special Rates for ${name}'s invites`,
  };
};

const coachravinder: orgTypes = {
  ...AVIVA,
  leadgen: AVIVA.leadgen
    ? {
        ...AVIVA.leadgen,
        hero: {
          title: `Train for the Aravali Trail Run`,
          subTitle: `Train yourself and your muscles for your first run with Coach Ravinder's training program.`,
          media: `${baseImageKitURL}/Screenshot_2022-12-07_at_4.02_1__IaTVHXXt.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670411126356`,
        },
        features: coach_ravinder_features,
        session: session,
      }
    : undefined,
  name: "Coach Ravinder",
  plansTitle: `Special Rates for Coach Ravinder's invites`,
  ctaText: "Start Now",
  rewards: coach_ravinder_rewards,
  rewardsHeading: "Perks",
};

export const orgObj: { [orgKey: string]: orgTypes } = {
  AVIVA,
  dufest: AIESECDU,
  pecfest: PECFEST,
  soumyajit: getInfluencerObj("Soumyajit"),
  prateeksha: getInfluencerObj("Prateeksha"),
  yuvraj: getInfluencerObj("Yuvraj"),
  dipanwita: getInfluencerObj("Dipanwita"),
  ritik: getInfluencerObj("Ritik"),
  yash: getInfluencerObj("Yash"),
  john: getInfluencerObj("John"),
  coachravinder: coachravinder,
};

export const universities: { [orgKey: string]: string } = {
  AIESECDU: "aiesecdu",
  aiesecdu: "AIESECDU",
  soumyajit: "soumyajit",
  prateeksha: "prateeksha",
  yuvraj: "yuvraj",
  dipanwita: "dipanwita",
  ritik: "ritik",
  yash: "yash",
  john: "john",
  pecfest: "pecfest",
  dufest: "dufest",
};

export const coaches: { [orgKey: string]: string } = {
  coachravinder: "coachravinder",
};

export const organization: { [orgKey: string]: string } = {
  AVIVA: "AVIVA",
  aviva: "AVIVA",
  ...universities,
  ...coaches,
};

export const getPrefixSuffix = (days: number) => {
  if (days === 30) {
    return {
      prefix: 1,
      suffix: "Month Plan",
      unit: "Month",
      nbMonth: 1,
    };
  } else if (days === 60) {
    return {
      prefix: 2,
      suffix: "Months Upgrade",
      unit: "Months",
      nbMonth: 2,
    };
  } else if (days === 90) {
    return {
      prefix: 3,
      suffix: "Months Plan",
      unit: "Months",
      nbMonth: 3,
    };
  } else if (days === 180) {
    return {
      prefix: 6,
      suffix: "Months Plan",
      unit: "Months",
      nbMonth: 6,
    };
  } else if (days === 365) {
    return {
      prefix: 1,
      suffix: "Year Plan",
      unit: "Year",
      nbMonth: 12,
    };
  } else if (days === 330) {
    return {
      prefix: 11,
      suffix: "Month Upgrade",
      unit: "Months",
      nbMonth: 11,
    };
  } else if (days === 270) {
    return {
      prefix: 9,
      suffix: "Month Upgrade",
      unit: "Months",
      nbMonth: 27,
    };
  } else {
    return {
      prefix: days,
      suffix: "days",
      unit: "days",
      nbMonth: days / 30,
    };
  }
};
