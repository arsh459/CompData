import { createAWSMedia } from "@components/MediaPicker/createUtils";
import { userBootcampStatus } from "@hooks/bootcamp/useBootCamp";
import { Badge } from "@models/Prizes/Prizes";
import { StepsDoc } from "@models/User/StepsDoc";
import { genderType } from "@models/User/User";
import { GFitAuthorization } from "@providers/GoogleFit/hooks/useGoogleOAuth";
import { dayMS } from "@providers/period/periodStore";
import { format } from "date-fns";
import { Pedometer } from "expo-sensors";
import { Platform } from "react-native";
import { PermissionStatus } from "react-native-permissions";

export const getTextForBootcamp = (
  bootcampStatus: userBootcampStatus,
  start: number,
  length: number
) => {
  if (bootcampStatus === "FINISHED") {
    return "Your bootcamp has finished. See Details";
  } else if (bootcampStatus === "FUTURE") {
    return `Your bootcamp will begin on ${format(new Date(start), "do MMMM")}`;
  } else if (
    bootcampStatus === "INVITED" ||
    bootcampStatus === "ONGOING_INVITED"
  ) {
    return `You are invited to join a FREE Bootcamp`;
  } else if (bootcampStatus === "ONGOING_JOINED") {
    return `Your bootcamp will end on ${format(
      new Date(start + length * dayMS),
      "do MMMM"
    )}`;
  }
};

export const getBGImage = (badge: Badge, gender?: genderType) => {
  if (gender === "male" && badge.bgImageMale) {
    return badge.bgImageMale;
  } else if (gender === "female" && badge.bgImageFemale) {
    return badge.bgImageFemale;
  } else if (badge.bgImageFemale) {
    return badge.bgImageFemale;
  } else if (badge.bgImageMale) {
    return badge.bgImageMale;
  }

  return undefined;
};

export const getStaticImageWorkout = (gender?: genderType) => {
  if (gender === "male") {
    return createAWSMedia(
      "4-Minute-Tabata-Ab-Workout_2_YZ1GzzW92",
      "image",
      322,
      165,
      "png",
      "4-Minute-Tabata-Ab-Workout_2_YZ1GzzW92",
      96,
      "4-Minute-Tabata-Ab-Workout_2_YZ1GzzW92.png",
      "sbusermedia",
      "4-Minute-Tabata-Ab-Workout_2_YZ1GzzW92.png",
      "ap-south-1",
      "https://ik.imagekit.io/socialboat/4-Minute-Tabata-Ab-Workout_2_YZ1GzzW92.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670068637756"
    );
  } else if (gender === "female") {
    return createAWSMedia(
      "4-Minute-Tabata-Ab-Workout_2__1__u1xNucpC7",
      "image",
      322,
      165,
      "png",
      "4-Minute-Tabata-Ab-Workout_2__1__u1xNucpC7",
      96,
      "4-Minute-Tabata-Ab-Workout_2__1__u1xNucpC7.png",
      "sbusermedia",
      "4-Minute-Tabata-Ab-Workout_2__1__u1xNucpC7.png",
      "ap-south-1",
      "https://ik.imagekit.io/socialboat/4-Minute-Tabata-Ab-Workout_2__1__u1xNucpC7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670068638467"
    );
    // return "https://ik.imagekit.io/socialboat/4-Minute-Tabata-Ab-Workout_2__1__u1xNucpC7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670068638467";
  }
  return undefined;
};

export const getStaticImageFood = (cusine?: "veg" | "nonveg") => {
  if (cusine === "veg") {
    return createAWSMedia(
      "4-Minute-Tabata-Ab-Workout_4__1__Be0aGjWyw",
      "image",
      322,
      165,
      "png",
      "4-Minute-Tabata-Ab-Workout_4_6W6AqW6Kc",
      96,
      "4-Minute-Tabata-Ab-Workout_4__1__Be0aGjWyw.png",
      "sbusermedia",
      "4-Minute-Tabata-Ab-Workout_4__1__Be0aGjWyw.png",
      "ap-south-1",
      "https://ik.imagekit.io/socialboat/4-Minute-Tabata-Ab-Workout_4_6W6AqW6Kc.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670068764402"
    );
  } else {
    return createAWSMedia(
      "4-Minute-Tabata-Ab-Workout_4_6W6AqW6Kc",
      "image",
      322,
      165,
      "png",
      "4-Minute-Tabata-Ab-Workout_4_6W6AqW6Kc",
      96,
      "4-Minute-Tabata-Ab-Workout_4_6W6AqW6Kc.png",
      "sbusermedia",
      "4-Minute-Tabata-Ab-Workout_4_6W6AqW6Kc.png",
      "ap-south-1",
      "https://ik.imagekit.io/socialboat/4-Minute-Tabata-Ab-Workout_4_6W6AqW6Kc.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670068764402"
    );

    // return "https://ik.imagekit.io/socialboat/4-Minute-Tabata-Ab-Workout_4_6W6AqW6Kc.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670068764402";
  }
};

export const getViewSteps = (
  perm: PermissionStatus,
  gFitAuth: GFitAuthorization,
  dailyStepTarget: number,
  stepDoc?: StepsDoc
) => {
  const stepsTaken = stepDoc?.steps ? stepDoc?.steps : 0;
  const prog = stepsTaken / dailyStepTarget;

  const permissionGiven =
    (Platform.OS === "ios" && perm === Pedometer.PermissionStatus.GRANTED) ||
    (Platform.OS === "android" && gFitAuth === "SUCCESS");

  if (permissionGiven && prog) {
    return {
      stepCt: stepsTaken,
      subtitle: `${
        stepDoc?.steps ? `${stepDoc?.steps}` : "0"
      } / ${dailyStepTarget} Steps taken`,
      title: "Today's Steps",
      progress: prog,
    };
  } else if (permissionGiven && !prog) {
    return {
      title: "Today's Steps",
      stepCt: stepsTaken,
      subtitle: `Start Walking. Your today's target is ${dailyStepTarget} Steps`,
      progress: 0,
    };
  } else if (prog) {
    return {
      stepCt: stepsTaken,
      subtitle: `${
        stepDoc?.steps ? `${stepDoc?.steps}` : "0"
      } / ${dailyStepTarget} Steps taken`,
      title: "Walking Plan",
      progress: prog,
    };
  } else {
    return {
      stepCt: 0,
      subtitle: "For every 1000 steps, you get 1FP",
      title: "Connect Steps",
      progress: 0,
    };
  }
};

export const getWorkoutTitleSubtitle = (nbWktsDone: number, nbWkts: number) => {
  if (nbWkts === 0) {
    if (nbWktsDone < 10) {
      return {
        title: "Workout Plan",
        subtitle: `0${nbWktsDone ? nbWktsDone : ""} Exercises done`,
        progress: 0,
      };
    } else {
      return {
        title: "Workout Plan",
        subtitle: `${nbWktsDone} Exercises done`,
        progress: 0,
      };
    }
  } else {
    if (nbWktsDone < 10) {
      return {
        title: "Workout Plan",
        subtitle: `0${nbWktsDone ? nbWktsDone : ""} / ${nbWkts} Exercises done`,
        progress: nbWktsDone / nbWkts,
      };
    } else {
      return {
        title: "Workout Plan",
        subtitle: `${nbWktsDone} / ${nbWkts} Exercises done`,
        progress: nbWktsDone / nbWkts,
      };
    }
  }
};

export const getExploreAllBgColors = (badge: Badge) => {
  const startColor =
    badge?.bgLinearColors2 && badge?.bgLinearColors2?.length >= 2
      ? badge.bgLinearColors2[0]
      : "transparent";

  const endColor =
    badge?.bgLinearColors2 && badge?.bgLinearColors2?.length >= 2
      ? badge.bgLinearColors2[1]
      : "transparent";
  const color1 =
    startColor === "transparent" ? "transparent" : `${startColor}80`;
  const color2 = startColor === "transparent" ? "transparent" : `${endColor}CC`;
  const colors = ["#52E9F300", color1, color2];

  return {
    startColor,
    endColor,
    colors,
  };
};
