import { LocalUser } from "@hooks/joinBoat/V6/interface";
import {
  acneIcon,
  boostMoodIcon,
  darkeningSkinIcon,
  energyLevelIcon,
  facialAndExcessHairIcon,
  fatigueIcon,
  looseWeightIcon,
  pcosPcodIcon,
} from "@constants/icons/iconURLs";
import { fitnessGoalTypes, transformationIconTypes } from "@models/User/User";
import {
  BMI_LOWER_NORMAL,
  BMI_UPPER_NORMAL,
  calculateBMI,
  INCH_TO_METER_CONST,
  weightForBMIHelper,
} from "../V5/Components/utils";
import { BodyTypeData } from "@constants/Avatar/BodyTypeData";
import { BodyTypesId } from "@constants/Avatar/utils";
import axios from "axios";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@config/firebase";
import { SlotBooking } from "@models/slots/Slot";
import { format } from "date-fns";

const defailt_bodyType = "hourglass_shaped" as BodyTypesId;

export type transformationType = {
  title: string;
  illustration: string;
  goal: string;
  dailyFitpoints: number;
  thingsToWorkOn: { text: string; icon: string }[];
  transformationImage?: string;
  // isAuthenticated?: boolean;
  // isOnboarded?: boolean;
};

export interface InternalCalendlyResponse {
  status: "success";
  id?: string;
  uid?: string;
  slotId?: string;

  startUnix?: number;
  endUnix?: number;
  link?: string;
  phone?: string;
}

export const internalMeetingDetails = async (
  link: string,
  uid: string,
  appId?: string
  // setError?: (errorText: string) => void
) => {
  const uuidList = link.split("https://api.calendly.com/scheduled_events/");

  if (uuidList.length === 2) {
    const response = await axios({
      url: "/api/calendly/meetingDetails",
      method: "POST",
      params: {
        uid,
        uuid: uuidList[1],
      },
    });

    // console.log("remote response", response);

    const respData = response.data as InternalCalendlyResponse;

    if (
      respData.id &&
      respData.slotId &&
      respData.startUnix &&
      respData.endUnix
    ) {
      if (appId) {
        const docId = getDoctorId(respData.startUnix);
        await updateDoc(doc(db, "appointments", appId), {
          startSlot: respData.startUnix,
          endSlot: respData.endUnix,
          link: respData.link ? respData.link : "",
          status: "SCHEDULED",
          doctorId: docId,
        });

        // await updateDoc(doc(db, "users", uid), {
        //   doctorIds: arrayUnion(docId),
        // });

        return appId;
      } else {
        const toSave: SlotBooking = {
          id: respData.id,
          startUnix: respData.startUnix,
          endUnix: respData.endUnix,
          slotId: respData.slotId,
          createdOn: Date.now(),
          version: "calendly",
          link: respData.link ? respData.link : "",
          phone: respData.phone ? respData.phone : "",
          uid,
          rawString: `${format(
            new Date(respData.startUnix),
            "eee hh:mm a"
          )}-${format(new Date(respData.endUnix), "hh:mm a")}`,
        };

        await setDoc(
          doc(doc(db, "slots", respData.slotId), "slotBooking", respData.id),
          toSave
        );
      }

      return respData.id;
    }
  }

  return "";
};

export function convertUnixToIST(unixTimestamp: number) {
  // Convert the Unix timestamp to milliseconds
  let date = new Date(unixTimestamp);

  // Define offset for IST (Indian Standard Time is UTC+5:30)
  let offsetIST = 330; // in minutes
  let localTime = date.getTime();
  let localOffset = date.getTimezoneOffset() * 60000;

  // Convert the Date object to IST in milliseconds
  let istTime = localTime + localOffset + offsetIST * 60000;

  // Create new Date object for IST
  let istDate = new Date(istTime);

  // Extract hours and minutes as numbers
  let hours = istDate.getHours();
  let minutes = istDate.getMinutes();

  // Return tuple of hours and minutes
  return [hours, minutes];
}

export const maitreeUID = "fC1idaBK2zbWdKhE5GFCfsoYTrJ3";
export const monaUID = "A0PdJiCDDpdd1PCrkhjQ3WjQEuk2";
export const jaytiUID = "s8yb7RmadXQT4vJIsST0Jio1XQD3";
export const mansiUID = "PkAUaJD109N9xFRJoKU4oaVJS223";
export const nishaUID = "Th68Mg4rbDXFJEr0SUnQPVZl9oJ3";
export const sauravUID = "96Xj1xjNTLVZy6TQ8Ett48WCXNt2";

export const getDoctorId = (start: number) => {
  console.log("start", start);
  const [hour, _] = convertUnixToIST(start);
  console.log("hour", hour);
  if (hour > 16) {
    return maitreeUID;
  } else {
    return monaUID;
  }
};

const getFitnessGoal = (localUser?: LocalUser): fitnessGoalTypes => {
  if (
    localUser?.fitnessGoal?.length &&
    localUser.fitnessGoal[0] === "pcos_pcod"
  ) {
    return "pcos_pcod";
  } else if (
    localUser?.fitnessGoal?.length &&
    localUser.fitnessGoal[0] === "keep_fit"
  ) {
    return "keep_fit";
  }

  return "lose_weight";
};

const getPCOSObj = (localUser?: LocalUser) => {
  const thingsToWordOn: { text: string; icon: string }[] = [];
  const illustration =
    BodyTypeData[defailt_bodyType].image[
      localUser?.gender === "male" ? "male" : "female"
    ];

  const { weightString, action } = getWeightLossValue(localUser);
  if (action !== "unknown") {
    thingsToWordOn.push({ text: weightString, icon: looseWeightIcon });
  }

  if (localUser?.cycleLength === "35_45") {
    thingsToWordOn.push({
      text: "Regularise your cycle to 28 days",
      icon: pcosPcodIcon,
    });
  } else if (localUser?.cycleLength === "45_60") {
    thingsToWordOn.push({
      text: "Regularise your cycle to 28 - 90 days",
      icon: pcosPcodIcon,
    });
  } else if (localUser?.cycleLength === "60_more") {
    thingsToWordOn.push({
      text: "Regularise your cycle to 90 - 180 days",
      icon: pcosPcodIcon,
    });
  }

  if (localUser?.pcosSymptoms?.length) {
    for (const pcosSymptom of localUser.pcosSymptoms) {
      if (thingsToWordOn.length >= 3) {
        break;
      }

      if (pcosSymptom === "bad_mood") {
        thingsToWordOn.push({ text: "Boost your mood", icon: boostMoodIcon });
      }

      if (pcosSymptom === "acne") {
        thingsToWordOn.push({ text: "Fix acne on face", icon: acneIcon });
      }
    }
  }

  if (thingsToWordOn.length < 3) {
    thingsToWordOn.push({
      text: "2x your energy level",
      icon: energyLevelIcon,
    });
  }

  return {
    title: `${
      localUser?.name ? localUser.name : "Hi there"
    }, We will help you reverse PCOS`,
    illustration: illustration,
    goal: "Reverse PCOS",
    dailyFitpoints: localUser?.dailyFPTarget ? localUser.dailyFPTarget : 20,
    thingsToWorkOn: thingsToWordOn,
  };
};

const getKeepFitObj = (localUser?: LocalUser): transformationType => {
  const illustration =
    BodyTypeData[defailt_bodyType].image[
      localUser?.gender === "male" ? "male" : "female"
    ];

  return {
    title: `${
      localUser?.name ? localUser.name : "Hi there"
    }, We will help you gamify healthy living!`,
    illustration: illustration,
    goal: "Keep Active & Fit",
    dailyFitpoints: localUser?.dailyFPTarget ? localUser.dailyFPTarget : 20,
    thingsToWorkOn: [
      { text: "2x your energy level", icon: energyLevelIcon },
      { text: "Boost your mood", icon: boostMoodIcon },
    ],
  };
};

export const getWeightLossValue = (localUser?: LocalUser) => {
  const tgWeight = localUser?.desiredWeight;
  const currWeight = localUser?.weight;

  // console.log("tg", tgWeight, currWeight);

  let weightString = "";
  let weightDelta = -1;
  let action: "unknown" | "gain" | "lose" = "unknown";
  if (tgWeight && currWeight && tgWeight > currWeight) {
    weightString = `gain ${tgWeight - currWeight} Kgs`;
    weightDelta = tgWeight - currWeight;
    action = "gain";
  } else if (tgWeight && currWeight && currWeight > tgWeight) {
    weightString = `lose ${currWeight - tgWeight} Kgs`;
    weightDelta = currWeight - tgWeight;
    action = "lose";
  } else if (localUser?.height && localUser.weight) {
    const heightInMeter = localUser?.height * INCH_TO_METER_CONST;
    const currentBMI = calculateBMI(heightInMeter, localUser.weight);
    console.log("weight", currentBMI);

    // lose weight
    if (currentBMI > BMI_UPPER_NORMAL) {
      const tgWeightNow = weightForBMIHelper(heightInMeter, BMI_UPPER_NORMAL);
      weightString = `lose ${localUser.weight - tgWeightNow} Kgs`;
      weightDelta = localUser.weight - tgWeightNow;
      action = "lose";
    }
    // gain weight
    else if (currentBMI < BMI_LOWER_NORMAL) {
      const tgWeightNow = weightForBMIHelper(heightInMeter, BMI_LOWER_NORMAL);
      weightString = `gain ${tgWeightNow - localUser.weight} Kgs`;
      weightDelta = tgWeightNow - localUser.weight;
      action = "gain";
    } else {
      weightString = "get fit";
      weightDelta = -1;
    }
  } else {
    weightString = "get fit";
    weightDelta = -1;
  }

  return {
    weightString,
    weightDelta,
    action,
  };
};

const getLoseWeightObj = (localUser?: LocalUser): transformationType => {
  const { weightString } = getWeightLossValue(localUser);

  const illustration =
    BodyTypeData[
      localUser?.desiredBodyType ? localUser.desiredBodyType : defailt_bodyType
    ].image[localUser?.gender === "male" ? "male" : "female"];

  return {
    title: `${
      localUser?.name ? localUser.name : "Hi there"
    }, We will help you ${weightString}!`,
    illustration: illustration,
    goal: weightString,
    dailyFitpoints: localUser?.dailyFPTarget ? localUser.dailyFPTarget : 20,
    thingsToWorkOn: [
      { text: weightString, icon: looseWeightIcon },
      { text: "Boost your mood", icon: boostMoodIcon },
      { text: "2x your energy level", icon: energyLevelIcon },
    ],
  };
};

export const getTransdormationData = (
  localUser?: LocalUser
): transformationType => {
  const goal = getFitnessGoal(localUser);

  if (goal === "keep_fit") {
    return getKeepFitObj(localUser);
  } else if (goal === "pcos_pcod") {
    return getPCOSObj(localUser);
  } else {
    return getLoseWeightObj(localUser);
  }
};

export const getTransdormationDataV2 = (localUser?: LocalUser) => {
  const goal = getFitnessGoal(localUser);

  if (goal === "keep_fit") {
    return {
      title: `${
        localUser?.name ? localUser.name : "Hi there"
      }, We will help you gamify healthy living!`,
    };
  } else if (goal === "pcos_pcod" || goal === "regularise_cycle") {
    return {
      title: `${
        localUser?.name ? localUser.name : "Hi there"
      }, We will help you reverse PCOS`,
    };
  } else {
    return {
      title: `${
        localUser?.name ? localUser.name : "Hi there"
      }, We will help you in weightloss`,
    };
  }
};

export const getTransformationIcon = (
  type: transformationIconTypes
): string => {
  if (type === "weight") {
    return looseWeightIcon;
  } else if (type === "acne") {
    return acneIcon;
  } else if (type === "bad_mood") {
    return boostMoodIcon;
  } else if (type === "cycleLength") {
    return pcosPcodIcon;
  } else if (type === "darkening_skin") {
    return darkeningSkinIcon;
  } else if (type === "energy") {
    return energyLevelIcon;
  } else if (type === "facial_and_excess_hair") {
    return facialAndExcessHairIcon;
  } else if (type === "fatigue") {
    return fatigueIcon;
  } else if (type === "hairfall") {
    return facialAndExcessHairIcon;
  } else if (type === "mood") {
    return boostMoodIcon;
  } else if (type === "periodLength") {
    return pcosPcodIcon;
  }

  return "";
};
