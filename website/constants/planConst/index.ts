import { GREESHA_UID } from "@templates/joinBoatTemplate/V6/CoachAttUtils";

type planStepsType = { img: string; text: string };

type cochesType = {
  name: string;
  number: string;
  image: string;
  planSteps: planStepsType[];
};

export const freePlanSteps: planStepsType[] = [
  {
    img: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Frame_1367_hra9dhxkN.png?ik-sdk-version=javascript-1.4.3&updatedAt=1678448869249",
    text: "Short videos and demo workouts",
  },
  {
    img: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Frame_1368_OPvv5W5Ie.png?ik-sdk-version=javascript-1.4.3&updatedAt=1678448869246",
    text: "Browse through 500+ Recipes and articles by experts",
  },
  {
    img: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Frame_1369_i47tFmG9b.png?ik-sdk-version=javascript-1.4.3&updatedAt=1678448869245",
    text: "Period, Energy, Mood Trackers and many more",
  },
];

export const coches: { [key: string]: cochesType } = {
  [GREESHA_UID]: {
    name: "Greesha Dhingra",
    number: "+91 9958730020",
    image:
      "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/Group_1361_Ya3TTtF3J.png?ik-sdk-version=javascript-1.4.3&updatedAt=1678455522199",
    planSteps: [
      {
        img: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Frame_1366_16LWFY7ajh.png?ik-sdk-version=javascript-1.4.3&updatedAt=1678448869251",
        text: "Download The SocialBoat App",
      },
      {
        img: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Frame_1367_hra9dhxkN.png?ik-sdk-version=javascript-1.4.3&updatedAt=1678448869249",
        text: "Start Following your daily Workout Plan",
      },
      {
        img: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Frame_1368_OPvv5W5Ie.png?ik-sdk-version=javascript-1.4.3&updatedAt=1678448869246",
        text: "Browse through 500+ Recipes and articles by experts",
      },
    ],
  },
};
