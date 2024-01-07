import {
  liveGreeshaIcon,
  msgIcon16,
  pauseIcon,
  watchIcon16,
} from "@constants/imageKitURL";
import { format } from "date-fns";

export const experWrapper = {
  feature: [
    "24 x 7 WhatsApp community with your coach to get any women health related answers",
    "Weekly AMAs and Knowledge sessions by leading industry experts",
  ],
  rules: [
    "This is a women only community. Any male person will be removed",
    "Please be respectful to all members.",
    "Do not send DMs to other community members.",
    "Do not spam or share irrelevant pages or promotional material",
    "If we get complaints from our members, our community manager might remove you from the community.",
  ],
};

export const pauseBreak = {
  mainIcon: pauseIcon,
  heading: "Pause when you’re taking a break ✋🏻",
  middleText:
    "Every month you will receive 4 pauses. You can use these to pause your subscription for any travel related plans or injury. To avail a pause, simply message to us and we will process your request.",
  list: [
    {
      icon: watchIcon16,
      text: "4 Pauses a Month",
    },
    {
      icon: msgIcon16,
      text: "Contact us to Pause your subscription",
    },
  ],
};
export const biWeeklyLive = {
  mainIcon: liveGreeshaIcon,
  heading: "Bi Weekly Live with Greesha on Women health",
  middleText:
    "Every two weeks we will host a live session with Greesha Dhingra, a Women health expert and India's top Yoga Instructor. In this session, we will do breathing exercises, some yoga practice and answer any questions you have about the program.",
  list: [
    {
      icon: watchIcon16,
      text: "45 minutes zoom session.",
    },
    {
      icon: msgIcon16,
      text: "We will DM you the link and schedule",
    },
  ],
};

export const formatUnixTimestamp = (timestamp?: number) => {
  if (timestamp) {
    const date = new Date(timestamp);
    const formattedTime = format(date, "h:mma");
    const formattedDate = format(date, "do MMMM");
    return { formattedTime, formattedDate };
  }
  return { formattedTime: "-", formattedDate: "-" };
};
