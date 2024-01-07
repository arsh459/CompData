import {
  aiIcon34,
  amaIcon34,
  // biweeklyIcon34,
  coachCallIcon34,
  customMealIcon,
  customWorkoutIcon,
  doctorIcon,
  healthCoachIcon,
  knowledgeVideoIcon34,
  monthlyPausescon34,
  msgIcon34,
  notificationIcon34,
  rewardIcon34,
  sakhiIcon34,
} from "@constants/imageKitURL";
import { RouteKeys } from "@routes/MainStack";

export const planContent: PlanContent[] = [
  {
    id: "1",
    bgColor: "#3FB9E833",
    colors: ["#3EB8E8", "#54FED7"],
  },
  {
    id: "2",

    bgColor: "#FF6B7733",
    colors: ["#FF6C77", "#FFAB70"],
  },
  {
    id: "3",
    bgColor: "#E376FF33",
    colors: ["#EC86FF", "#FE59A7"],
  },
];
export interface PlanContent {
  // currency: string;
  // price: string;
  // duration: string;
  bgColor: string;
  colors: string[];
  id: string;
}

export const listCard: ListCard[] = [
  {
    heading: "Customized Nutrition Plan",
    iconUri: customMealIcon,
    list: ["Made by a nutrition expert", "Track & log with a calorie tracker"],
  },
  {
    heading: "Customized Workout Plan",
    iconUri: customWorkoutIcon,
    list: ["Walk, run or do HIIT at home", "AI powered posture feedback"],
  },
  {
    heading: "24X7 Health Coach",
    iconUri: healthCoachIcon,
    list: ["Curates a 360 plan for you", "Ask any question, anytime."],
  },
];
export const listCardV2: ListCard[] = [
  {
    heading: "Get Consultation Call",
    iconUri: healthCoachIcon,
    list: ["Curates a 360 plan for you", "Ask any question, anytime."],
    mainText:
      "Consultation Call with your Personal Trainer to identify the right program for you",
  },
  {
    heading: "Exercise Plan",
    iconUri: customWorkoutIcon,
    list: ["Walk, run or do HIIT at home", "AI powered posture feedback"],
    mainText:
      "A full course of Interactive Exercise Videos that increase intensity as you progress.",
  },
  {
    heading: "Diet Plan",
    iconUri: customMealIcon,
    list: ["Made by a nutrition expert", "Track & log with a calorie tracker"],
    mainText: "Daily diet plan customised for you daily health goals",
  },
];
export const listCardV3: ListCard[] = [
  {
    navTo: "DoctorConsultation",
    heading: "Quarterly Doctor Consultation",
    iconUri: doctorIcon,
    list: ["Walk, run or do HIIT at home", "AI powered posture feedback"],
    isHighlighted: false,
    mainText:
      "Quarterly consultation with gynaecologist. Not available in Monthly Trial.",
  },
  {
    navTo: "NutritionScreen",
    heading: "Custom Diet Plan",
    iconUri: customMealIcon,
    list: ["Made by a nutrition expert", "Track & log with a calorie tracker"],
    mainText:
      "Our dietician will design your daily nutrition plan basis the doctor's feedback & your goals",
    isHighlighted: false,
  },
  {
    navTo: "Workout",
    heading: "Interactive Workout Plan",
    iconUri: customWorkoutIcon,
    list: ["Walk, run or do HIIT at home", "AI powered posture feedback"],
    isHighlighted: false,
    mainText:
      "A full course of Interactive Exercise Videos that are customised to your cycle.",
  },
  {
    navTo: "SheduleAmaGatewayScreen",
    heading: "Weekly Checkins",
    iconUri: healthCoachIcon,
    list: ["Curates a 360 plan for you", "Ask any question, anytime."],
    mainText:
      "Weekly call with your dietician to customise and adapt your plan.",
    isHighlighted: false,
  },
];
export const bonusListCard: ListCard[] = [
  {
    heading: "Get Consultation",
    iconUri: msgIcon34,
    list: ["Curates a 360 plan for you", "Ask any question, anytime."],
    mainText: "24x7 access to coach and dietician on chat.",
  },
  {
    heading: "AI FeedBack",
    iconUri: aiIcon34,
    list: ["Made by a nutrition expert", "Track & log with a calorie tracker"],
    mainText: "Instant Posture feedback, enabled by Artificial Intelligence.",
  },
  {
    heading: "Rewards",
    iconUri: rewardIcon34,
    list: ["Rewards and benefits on goal completion in Shop."],
    mainText: "Rewards and benefits on goal completion in Shop.",
  },
  {
    heading: "Knowledge Hub",
    iconUri: knowledgeVideoIcon34,
    list: ["Made by a nutrition expert", "Track & log with a calorie tracker"],
    mainText:
      "Access to 100+ exclusive video recipes & 250+ knowledge articles.",
  },
  {
    heading: "Coach Connect",
    iconUri: coachCallIcon34,
    list: ["Made by a nutrition expert", "Track & log with a calorie tracker"],
    mainText: "Weekly Goal Progress Calls with your Coach",
  },
];
export const bonusListCardV2: ListCardBonus[] = [
  {
    iconUri: notificationIcon34,
    navigateTo: "WorkoutSettingScreen",
    mainText: "Daily notifications & reminders",
  },
  {
    iconUri: rewardIcon34,
    mainText: "Rewards and benefits on goal completion.",
    navigateTo: "ShopScreen",
    navParam: { padding: 0 },
  },
  {
    iconUri: knowledgeVideoIcon34,
    mainText: "500+ video recipes and knowledge articles",
    navigateTo: "KnowledgeScreen",
    navParam: { padding: 0 },
  },
  {
    iconUri: amaIcon34,
    mainText: "Weekly AMAs with Gynaecologists and health experts",
    navigateTo: "ProCommunityGatewayScreen",
  },
  // {
  //   iconUri: biweeklyIcon34,
  //   mainText: "Bi Weekly live with Greesha",
  //   navigateTo: "BiWeeklyLiveGatewayScreen",
  // },
  {
    iconUri: monthlyPausescon34,
    mainText: "4 Monthly Pauses will be given",
    navigateTo: "WeeklyChekinsGatewayScreen",
  },

  {
    iconUri: sakhiIcon34,
    navigateTo: "StartNewChat",
    mainText: "Sakhi AI - To answer any menstrual health related question",
  },
];

export interface ListCard {
  conditionalNav?: "doctor";
  iconUri: string;
  heading: string;
  list: string[];
  navTo?: RouteKeys;
  mainText?: string;
  isHighlighted?: boolean;
}
export interface ListCardBonus {
  iconUri: string;
  // heading: string;
  // list: string[];
  mainText?: string;
  navigateTo?: RouteKeys;
  navParam?: { [key: string]: boolean | string | number };
}
export const faqContent: FAQDATA[] = [
  {
    heading: "Will a human customise my plan or AI?",
    text: "Our Diet and Workout Coach will create your plan. The AI is to help you assist and follow it on a daily basis.",
    id: "q-1",
  },
  {
    heading: "Who can I speak to if I have an issue?",
    text: "You can message us anytime. We are here to answer any health related question 24X7 for you.",
    id: "q-2",
  },
  {
    heading: "When will I get my diet plan?",
    text: "Post your call with our dietician, your plan will be assigned to you within 2 hours. If you have not received your plan, please DM us.",
    id: "q-3",
  },
  {
    heading: "Can you reverse my PCOS?",
    text: "PCOS cannot be cured. However, it can be effectively managed and possibly reversed for some people. Speak to our health consultant to know more.",
    id: "q-4",
  },
];
export const faqContentWalkToEarn: FAQDATA[] = [
  {
    heading: "How will I get my nutrition and workout plan?",
    text: "You can drop us a line by clicking Talk to coach or help button. We will also reach out to you on your provided phone number/email once you make the purchase",
    id: "1",
  },
  {
    heading: "How can I win the transformation challenge?",
    text: "To win the championship, create a team and start doing tasks in the game. Your top workouts would count towards your score. Team or person with highest score wins",
    id: "2",
  },
  {
    heading: "Is there a way to try out SocialBoat for free?",
    text: "We have a free program for everyone to try SocialBoat. However, if you want a health coach to customise it for you, you should try our Pro plan",
    id: "3",
  },
];
export interface FAQDATA {
  heading: string;
  text: string;
  id: string;
}
export const getImageUri = (
  highlightFirstItem: boolean | undefined,
  showNoTick: boolean | undefined,
  notSelectedIcon: string,
  rightArrowBowIconWhiteFrame14: string,
  rightTickIcon: string
) => {
  if (!highlightFirstItem && showNoTick) {
    return notSelectedIcon;
  } else if (highlightFirstItem) {
    return rightArrowBowIconWhiteFrame14;
  } else {
    return rightTickIcon;
  }
};
