import {
  amaIcon34,
  biweeklyIcon34,
  customMealIcon,
  customWorkoutIcon,
  healthCoachIcon,
  knowledgeVideoIcon34,
  monthlyPausescon34,
  notificationIcon34,
  rewardIcon34,
  sakhiIcon34,
} from "@constants/icons/iconURLs";
import { UserInterface } from "@models/User/User";
import { FAQDATA } from "@templates/joinBoatTemplate/utils";

export interface ListCard {
  iconUri: string;
  heading: string;
  list: string[];
  mainText?: string;
  isHighlighted?: boolean;
  inApp?: boolean;
}
export interface ListCardBonus {
  iconUri: string;

  mainText?: string;
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
export const listCardV3: ListCard[] = [
  //add flag to show it is first item
  {
    heading: "Weekly Checkins",
    iconUri: healthCoachIcon,
    list: ["Curates a 360 plan for you", "Ask any question, anytime."],
    mainText: "Every 7 days, we checkin and re customise your program",
    isHighlighted: true,
  },
  {
    heading: "Workout Plan",
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
    inApp: true,
  },
];
export const bonusListCard: ListCardBonus[] = [
  {
    iconUri: notificationIcon34,

    mainText: "Daily notifications & reminders",
  },
  {
    iconUri: rewardIcon34,
    mainText: "Rewards and benefits on goal completion.",
  },
  {
    iconUri: knowledgeVideoIcon34,
    mainText: "500+ video recipes and knowledge articles",
  },
  {
    iconUri: amaIcon34,
    mainText: "Weekly AMAs with Gynaecologists and health experts",
  },
  {
    iconUri: biweeklyIcon34,
    mainText: "Bi Weekly live with Greesha",
  },
  {
    iconUri: monthlyPausescon34,
    mainText: "4 Monthly Pauses will be given",
  },

  {
    iconUri: sakhiIcon34,
    mainText: "Sakhi AI - To answer any menstrual health related question",
  },
];
export const faqContent: FAQDATA[] = [
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

export const getStartTime = (
  user?: UserInterface,
  badgeId?: string,
  type?: "workout" | "nutrition"
) => {
  if (user && badgeId) {
    if (
      user.recommendationConfig?.badgeConfig &&
      user.recommendationConfig.badgeConfig[badgeId] &&
      user.recommendationConfig.badgeConfig[badgeId].start
    ) {
      return user.recommendationConfig.badgeConfig[badgeId].start;
    }

    if (
      type === "nutrition" &&
      user.recommendationConfig &&
      user.recommendationConfig.nutritionStart
    ) {
      return user.recommendationConfig.nutritionStart;
    }

    if (
      user.recommendationConfig &&
      user.recommendationConfig.start &&
      user.badgeId === badgeId
    ) {
      return user.recommendationConfig.start;
    }
  }

  return undefined;
};
