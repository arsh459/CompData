import {
  healthCoachIcon,
  customWorkoutIcon,
  customMealIcon,
  doctorIcon,
  liveIcon,
} from "@constants/icons/iconURLs";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { onboardUserSections } from "./JoinBoatTemplate";
import { planOfferingKeys } from "@models/SbPlans/interface";

export const getNextUserOnboardRoute = (
  key: onboardUserSections,
  override?: onboardUserSections
): { nextRoute: onboardUserSections } => {
  if (override) {
    return {
      nextRoute: override,
    };
  }
  return key === "name"
    ? {
        nextRoute: "instagramHandle",
      }
    : key === "instagramHandle"
    ? {
        nextRoute: "picture",
      }
    : key === "picture"
    ? {
        nextRoute: "join",
      }
    : key === "join"
    ? {
        nextRoute: "subscription",
      }
    : key === "subscription"
    ? {
        nextRoute: "gender",
      }
    : key === "gender"
    ? {
        nextRoute: "age",
      }
    : key === "age"
    ? {
        nextRoute: "height",
      }
    : key === "height"
    ? {
        nextRoute: "weight",
      }
    : key === "weight"
    ? {
        nextRoute: "bmi",
      }
    : key === "bmi"
    ? {
        nextRoute: "fitnessGoals",
      }
    : key === "fitnessGoals"
    ? {
        nextRoute: "fitnessGoalText",
      }
    : key === "fitnessGoalText"
    ? {
        nextRoute: "subscription",
      }
    : {
        nextRoute: "subscription",
      };
};

export const isProfileComplete = (
  name?: string,
  profileImage?: CloudinaryMedia | AWSMedia,
  email?: string,
  instagramLink?: string
) => {
  if (name && email && instagramLink) {
    return true;
  }

  return false;
};

export interface PlanContent {
  currency: string;
  price: string;
  duration: string;
  bgColor: string;
  colors: string[];
  id: string;
}

export const planContent: PlanContent[] = [
  {
    currency: "INR",
    price: "999",
    duration: "1 Year",
    bgColor: "#E376FF33",
    colors: ["#EC86FF", "#FE59A7"],
    id: "1",
  },
  {
    currency: "INR",
    price: "499",
    duration: "6 months",
    bgColor: "#FF6B7733",
    colors: ["#FF6C77", "#FFAB70"],
    id: "2",
  },
  {
    currency: "INR",
    price: "89",
    duration: "1 months",
    bgColor: "#3FB9E833",
    colors: ["#3EB8E8", "#54FED7"],
    id: "3",
  },
];

export interface ListCard {
  iconUri: string;
  heading: string;
  list: string[];
  textColor?: string;
  mainText?: string;
  key: planOfferingKeys;
}

export const listCard: ListCard[] = [
  {
    heading: "Doctor Consultation",
    iconUri: doctorIcon,
    list: [
      "Quarterly consultation with gynaecologist.",
      "Not available in Monthly Trial.",
    ],
    key: "nbDoctorConsultation",
  },
  {
    heading: "Live Zoom Classes",
    iconUri: liveIcon,
    list: ["4 days a week, ZOOM classes", "Recordings available post session"],
    key: "nbLiveClasses",
  },
  {
    heading: "Customized Nutrition Plan",
    iconUri: customMealIcon,
    list: ["Made by a nutrition expert", "Track & log with a calorie tracker"],
    textColor: "#F6AB2D",
    key: "nbDietConsultation",
  },
  {
    heading: "Daily Workout Videos",
    iconUri: customWorkoutIcon,
    list: [
      "A Daily workout program by your coach",
      "AI powered posture feedback",
    ],
    textColor: "#70B0FF",
    key: "nbDailyVideoes",
  },

  {
    heading: "24X7 Health Coach",
    iconUri: healthCoachIcon,
    list: [
      "Motivates and helps you achieve your goal",
      "Ask any question, anytime.",
    ],
    textColor: "#C991FF",
    key: "isAccountabilityCoach",
  },
];

export const listCardV2: ListCard[] = [
  {
    heading: "Get Consultation Call",
    iconUri: healthCoachIcon,
    list: ["Curates a 360 plan for you", "Ask any question, anytime."],
    mainText:
      "Consultation Call with your Personal Trainer to identify the right program for you",
    key: "isAccountabilityCoach",
  },
  {
    heading: "Exercise Plan",
    iconUri: customWorkoutIcon,
    list: ["Walk, run or do HIIT at home", "AI powered posture feedback"],
    mainText:
      "A full course of Interactive Exercise Videos that increase intensity as you progress.",
    key: "nbDailyVideoes",
  },
  {
    heading: "Diet Plan",
    iconUri: customMealIcon,
    list: ["Made by a nutrition expert", "Track & log with a calorie tracker"],
    mainText: "Daily diet plan customised for you daily health goals",
    key: "nbDietConsultation",
  },
];

export interface FAQDATA {
  heading: string;
  text: string;
  id: string;
}

export const faqContent: FAQDATA[] = [
  {
    heading: "How long does it take to cure pcod?",
    text: "PCOD can not be cured permanently. It is a lifelong syndrome. However, it can be effectively managed in 3-6 months with the right lifestyle changes like reducing sugar and carbs, 30 minutes of daily workout and managing daily stress",
    id: "1",
  },
  {
    heading: "Can PCOS be treated completely?",
    text: "PCOS is a lifelong syndrome and as of now, there is no way to treat it completely. However, you can lead a normal active life if you make changes in lifestyle early!",
    id: "2",
  },
  {
    heading: "What is most important in treating PCOS/PCOD?",
    text: "Early detection and lifestyle changes are most important. PCOS if untreated can lead to diabetes, infertility, kidney disease and cancer. It is important you start making lifestyle changes as soon as you get diagnosed",
    id: "3",
  },
  {
    heading: "How to treat PCOS fatigue?",
    text: "PCOS fatigue can be treated by altering ones diet and lifestyle. One should eat foods with lower carbohydrates, practice time restricted eating and have 30 minutes of workout at least 3 days a week",
    id: "4",
  },
  {
    heading: "How to cure PCOS permanently?",
    text: "Curing PCOS permanently is not possible as of now. However, with an active life, good nutrition you can minimise all symptoms of the disease like acne, weight gain, infertility, hairloss.",
    id: "5",
  },
  {
    heading: "What is the best diet for PCOS?",
    text: "Diet is always personalised to every individual. However, low carb and time restricted diets like Intermittent fasting are known to help a lot with PCOS management. They help in managing insulin resitance, which is now believed to be a root cause of pcos.",
    id: "6",
  },
  {
    heading: "How to cure PCOS acne?",
    text: "Treating PCOS acne can take time. It takes at least 6 months to see results and 2 years for the scarring to go away. Diet and lifestyle changes are known to have great impact. We also recommend a number of natural remedies that can help manage and reduce acne.",
    id: "7",
  },
  {
    heading: "How is SocialBoat PCOS reversal program different?",
    text: "SocialBoat PCOS program is a fun game that you follow on an app. We have seen 85% people who start any fitness journey drop off. Because of this, SocialBoat is designed to make healthy living fun and interactive",
    id: "8",
  },
];

export const superwomanChallengeFaqContent: FAQDATA[] = [
  {
    heading: "Who is this challenge for?",
    text: "Any woman in the ages of 18 to 50 who feels a lack of motivation to be regular with workouts, should join this challenge.",
    id: "1",
  },
  {
    heading: "Is this challenge FREE?",
    text: "Yes, the challenge is free to start for anyone. Paid users of SocialBoat also get direct access and some additional tasks in the challenge.",
    id: "2",
  },
  {
    heading: "Do I need any equipment to participate in this challenge?",
    text: "You do not need any equipment to participate in this challenge - Just some intent and a mat! In case any challenge requires us to",
    id: "3",
  },
  {
    heading: "What exactly is the challenge?",
    text:
      "Over 21 days, we want you to simply build a habit of moving daily. We understand you have busy lifestyles, this challenge requires you to commit 10 minutes daily. You will receive one workout task and one diet task - Everyday" +
      "As you keep participating in our challenges, we will gradually increase intensity and within a few months, you will have a regular 40 min routine without even realizing :)",
    id: "4",
  },
  {
    heading: "I am a lady with back issues, should I participate ?",
    text: "Yes, you must. In case a particular’s day’s exercise doesnt suit, you may skip so but you should definetely do all diet tasks and participate on other days. At the end of the day, the purpose is to build a routine for you",
    id: "5",
  },
  {
    heading: "Can I invite my friends too?",
    text: "Yes, do share this link with your friends, invite them and compete. Working out in sync with your besties is usually a great motivation to continue daily.",
    id: "6",
  },
  {
    heading:
      "What are FITPOINTS that I earn for doing tasks in the challenge? ",
    text: "You earn points for every task you finish. The more fitpoints you collect, the higher your ranking. These FitPoints can be used to buy additional discounts and offers (on health products) in our shop section on the app. ",
    id: "7",
  },
  {
    heading: "Can I join late?",
    text: "YES. Pls join this challenge the day you discover this. We mean it with all the right intentions. We always have challenges going on which aim to build a regular habit of moving and eating healthy everyday",
    id: "8",
  },
];
