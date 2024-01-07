import {
  Cohort,
  EventInterface,
  LeaderboardDescription,
} from "@models/Event/Event";
import { TerraUser } from "@models/Terra/TerraUser";
import { PostButton } from "../PostSection";

export const checkinButton: PostButton = {
  text: "Reply",
  icon: "https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/60/000000/external-arm-muscle-health-vitaliy-gorbachev-lineal-vitaly-gorbachev.png",
  selectedIcon:
    "https://img.icons8.com/external-vitaliy-gorbachev-blue-vitaly-gorbachev/60/000000/external-arm-muscle-health-vitaliy-gorbachev-blue-vitaly-gorbachev.png",
  selected: false,
  key: "checkIn",
  selectedText: "Checked",
};

export const replyButton: PostButton = {
  text: "Reply",
  icon: "https://img.icons8.com/ios/100/000000/reply-arrow.png",
  selectedIcon: "https://img.icons8.com/ios/100/000000/reply-arrow.png",
  selected: false,
  key: "checkIn",
};

export const liveButton: PostButton = {
  text: "Join",
  icon: "https://img.icons8.com/ios/150/000000/zoom.png",
  selectedIcon: "https://img.icons8.com/ios/150/000000/zoom.png",
  selected: false,
  key: "join",
};

export const clapButton: PostButton = {
  text: "Clap",
  icon: "https://img.icons8.com/emoji/48/000000/nikita-clapping-hands-emoji.png",
  selectedIcon:
    "https://img.icons8.com/emoji/48/000000/nikita-clapping-hands-emoji.png",
  selected: false,
  key: "clap",
};

export const dmButton: PostButton = {
  text: "DM",
  icon: "https://img.icons8.com/ios/100/000000/speech-bubble-with-dots.png",
  selectedIcon:
    "https://img.icons8.com/ios/100/000000/speech-bubble-with-dots.png",
  selected: false,
  key: "dm",
};

export const getPostIcons = (
  live?: boolean,
  pin?: boolean,
  viewLevel?: "session" | "post" | "postReply"
  // noReply?: boolean,
  // session?: boolean
) => {
  if (live) {
    return [clapButton, checkinButton, liveButton];
  } else if (viewLevel === "session") {
    return [clapButton, checkinButton];
  } else if (viewLevel === "post") {
    return [clapButton, replyButton];
  } else {
    return [clapButton];
  }

  // else if (!pin && noReply) {
  //   return [clapButton];
  // } else if (!pin || !session) {
  //   return [clapButton, replyButton];
  // } else {
  //   return [clapButton, checkinButton];
  // }
};

export const getJoinURL = (
  allEventCohorts: {
    [eId: string]: { [cohortId: string]: Cohort };
  },
  selectedEvent?: EventInterface,
  cohortId?: string
): string => {
  if (
    selectedEvent &&
    cohortId &&
    allEventCohorts[selectedEvent.id] &&
    allEventCohorts[selectedEvent.id][cohortId] &&
    allEventCohorts[selectedEvent.id][cohortId].cohortJoinURL
  ) {
    return allEventCohorts[selectedEvent.id][cohortId].cohortJoinURL as string;
  } else if (selectedEvent && cohortId && selectedEvent.joinURL) {
    return selectedEvent.joinURL;
  }

  return "";
};

export const getEventCohortsFromObj = (
  eventId: string,
  allEventCohorts: {
    [eId: string]: { [cohortId: string]: Cohort };
  }
): Cohort[] => {
  if (
    allEventCohorts[eventId] &&
    Object.keys(allEventCohorts[eventId]).length > 0
  ) {
    return Object.values(allEventCohorts[eventId]);
  }

  return [];
};

export const hideJoinModal = (
  leaderUID: string,
  userId?: string,
  userEvents?: string[],
  eventId?: string
) => {
  // console.log("eventId", !eventId || leaderUID === userId);
  if (leaderUID === userId || !eventId) {
    // console.log("here");
    return true;
  } else if (!userId || !userEvents) {
    // console.log("here 2");
    return false;
  } else if (userEvents && userId && eventId && !userEvents.includes(eventId)) {
    return false;
  } else if (userEvents && userId && eventId && userEvents.includes(eventId)) {
    // console.log("here 3");
    return true;
  }
};

export const getBottomButtonType = (
  leaderUID: string,
  userId?: string,
  userEvents?: string[],
  eventId?: string,
  terraUser?: TerraUser
  // viewOnly?: boolean
): "none" | "join" | "wearable" => {
  // console.log("eventId", eventId, userEvents);
  if (!eventId) {
    return "none";
  } else if (!userId || !userEvents) {
    return "join";
  } else if (userEvents && eventId && !userEvents.includes(eventId)) {
    return "join";
  } else if (
    userEvents &&
    eventId &&
    userEvents.includes(eventId) &&
    !terraUser
  ) {
    return "wearable";
  } else if (leaderUID === userId && !terraUser) {
    return "wearable";
  }

  return "none";
};

export const getLeaderboardDescs = (
  leaderBoard?: LeaderboardDescription[]
): LeaderboardDescription[] => {
  const initialLeaders: LeaderboardDescription[] = [
    {
      kpi: "calories",
      name: "Calories",
    },
  ];

  if (leaderBoard) {
    return [...leaderBoard, ...initialLeaders];
  }

  return initialLeaders;
};
