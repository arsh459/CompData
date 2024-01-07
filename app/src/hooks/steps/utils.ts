import { Activity } from "@models/Activity/Activity";
import { StepsDoc } from "@models/User/StepsDoc";
import firestore from "@react-native-firebase/firestore";
import { format } from "date-fns";
import { DayStepDoc } from "./useUserPreviousSteps";

export const getTimesForSteps = (numDays: number) => {
  //   const numDays = 1;

  const now = new Date();
  const nowStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0
  );
  const nowStartUnix = nowStart.getTime();

  let dSt = nowStartUnix - (numDays - 1) * 24 * 60 * 60 * 1000;

  const daySteps: [Date, Date][] = [];
  for (let i: number = 0; i < numDays; i++) {
    const tDay = new Date(dSt);
    const dayStart = new Date(
      tDay.getFullYear(),
      tDay.getMonth(),
      tDay.getDate(),
      0,
      0,
      0,
      0
    );

    const dayStartUnix = dayStart.getTime();
    const dayEnd = new Date(dayStartUnix + 24 * 60 * 60 * 1000);

    daySteps.push([dayStart, dayEnd]);

    dSt = dayEnd.getTime();
  }

  return daySteps;
};

export const getActivityForStep = async (
  uid: string,
  // start: number,
  // end: number,
  date: string,
  taskId?: string
) => {
  if (taskId) {
    const relevantDocs = await firestore()
      .collection("users")
      .doc(uid)
      .collection("activities")
      .where("date", "==", date)
      // .where("createdOn", "<=", end)
      .where("taskId", "==", taskId)
      .get();

    if (relevantDocs.docs.length) {
      return relevantDocs.docs[0].data() as Activity;
    }
  }

  return undefined;
};

export const getStartEndForStep = (relStepDoc: StepsDoc) => {
  if (relStepDoc.date) {
    const startDateSplits = relStepDoc.date.split("-");
    if (startDateSplits.length === 3) {
      const nowStart = new Date(
        parseInt(startDateSplits[0]),
        parseInt(startDateSplits[1]) - 1,
        parseInt(startDateSplits[2]),
        0,
        0,
        0,
        0
      );

      const nowStartUnix = nowStart.getTime();

      return {
        start: nowStartUnix,
        end: nowStartUnix + 24 * 60 * 60 * 1000 - 1,
      };
    }
  }

  const dtUnic = new Date(relStepDoc.unix);
  const nowStart = new Date(
    dtUnic.getFullYear(),
    dtUnic.getMonth(),
    dtUnic.getDate(),
    0,
    0,
    0,
    0
  );

  const nowStartUnix = nowStart.getTime();

  return {
    start: nowStartUnix,
    end: nowStartUnix + 24 * 60 * 60 * 1000 - 1,
  };
};

export const createUIElementData = (
  stepObj: StepsDoc,

  dt: number,
  act?: Activity
): DayStepDoc => {
  return {
    id: stepObj.id,
    stepDtString: stepObj.date,
    steps: stepObj.steps,
    unix: stepObj.unix,
    dtString: format(new Date(dt), "EEEE do MMM"),
    fp: act?.calories ? Math.round(act.calories / 300) : 0,
  };
};
