import {
  accountabilityCoachBg,
  amaBg,
  blogtipsBg,
  dailyVideoBg,
  dietConsultantBg,
  doctorConsultantBg,
  liveClasses,
  liveInteractionBg,
  pauseFunctionBg,
  periodTrackBg,
  progressTrackBg,
  recipeTipsBg,
  rewardsBg,
  weeklyChallengeBg,
} from "@constants/icons/iconURLs";

export type discriminatorType =
  | "Cost"
  | "Doctor Consultation"
  | "Diet Consultation"
  | "Accountability Coach"
  | "Live Interactions with Greesha"
  | "Daily Workout Videos"
  | "Pause Functionality"
  | "Weekly Challenges"
  | "Period Tracker"
  | "500+ Recipes & Diet tips"
  | "Rewards to achieve"
  | "250+ expert tips & Blogs"
  | "Progress Trackers"
  | "Exclusive AMA's & sessions with Experts"
  | "Live classes";

export const discriminator: discriminatorType[] = [
  "Cost",
  "Live classes",
  "Doctor Consultation",
  "Diet Consultation",
  "Daily Workout Videos",
  "Accountability Coach",
  // "Live Interactions with Greesha",

  "Pause Functionality",
  "Weekly Challenges",
  "Period Tracker",
  "500+ Recipes & Diet tips",
  "Rewards to achieve",
  "250+ expert tips & Blogs",
  "Progress Trackers",
  "Exclusive AMA's & sessions with Experts",
];

export const discriminatorMobile: discriminatorType[] = [
  "Cost",
  "Live classes",
  "Doctor Consultation",
  "Diet Consultation",
  "Daily Workout Videos",
  "Accountability Coach",
  // "Live Interactions with Greesha",

  "Pause Functionality",
];

export interface modalContent {
  imageURI: string;
  text: string;
}

export const modalDetails: Partial<Record<discriminatorType, modalContent>> = {
  "Doctor Consultation": {
    imageURI: doctorConsultantBg,
    text: "Every 4 months you get a consultation with our in-house doctor. Additional consultations are available at INR 700",
  },
  "Diet Consultation": {
    imageURI: dietConsultantBg,
    text: "Every week your dietician will consult with you and adapt your plan basis your progress. In addition to that you can reach out to her between 10am-6pm for any questions.",
  },
  "Accountability Coach": {
    imageURI: accountabilityCoachBg,
    text: "Your accountability coach will help you achieve your goal. From motivation to any query you have about your program, diet or medicine, the coach will be there with you 24 x 7.",
  },
  "Live Interactions with Greesha": {
    imageURI: liveInteractionBg,
    text: "Every 2 weeks, we will host live meditation or workout sessions with our coaches. You can ask your questions about the program, menstrual health and fitness",
  },
  "Daily Workout Videos": {
    imageURI: dailyVideoBg,
    text: "We provide a personalised course basis your menstrual cycle. Everyday you will get a workout video from your coach that you can watch on the App, TV or your laptop.",
  },
  "Pause Functionality": {
    imageURI: pauseFunctionBg,
    text: "Every month, you can pause your membership for 4 days.",
  },
  "Weekly Challenges": {
    imageURI: weeklyChallengeBg,
    text: "Every week, we host interesting challenges in our community on diet, yoga and general wellness",
  },
  "Period Tracker": {
    imageURI: periodTrackBg,
    text: "Try our AI powered period tracker which suggests recipees, workouts and exercises basis your cycle.",
  },
  "500+ Recipes & Diet tips": {
    imageURI: recipeTipsBg,
    text: "We have created 500+ recipes and diet tips from famous Instragram influencers on PCOS, hormonal balance and weight loss",
  },
  "Rewards to achieve": {
    imageURI: rewardsBg,
    text: "As you finish your goals on the app, you will unlock rewards and prizes from women health brands in the app",
  },
  "250+ expert tips & Blogs": {
    imageURI: blogtipsBg,
    text: "Read through over 250 articles written by diet experts, doctors and influencers",
  },
  "Progress Trackers": {
    imageURI: progressTrackBg,
    text: "Track Sleep, weight and progress on the app. Our Sakhi AI will give you actionable insights to keep you motivated",
  },
  "Exclusive AMA's & sessions with Experts": {
    imageURI: amaBg,
    text: "Every week we host AMAs and Live sessions with women health experts in our community. You have access to attend all of them.",
  },
  "Live classes": {
    imageURI: liveClasses,
    text: "Live classes on ZOOM, 4 days a week with an expert YOGA instructor. Recordings available post session.",
  },
};
