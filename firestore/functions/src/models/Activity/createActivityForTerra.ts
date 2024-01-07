import { UserInterface } from "../User/User";
import { Activity } from "./Activity";
import {
  getRawActivities,
  getUserTerraActivities,
  saveNewActivity,
} from "./getUtils";
import { v4 as uuidv4 } from "uuid";
import { getUnixDayStartForFormattedDate } from "../../main/PubSub/activityTracker/utils";
import { FirestoreTerra, TerraActivity } from "../Terra/TerraUser";
import { summariesTerraActivities } from "../../main/Https/terraCentral/handleTerraActivityUpdate";
import { getPeriodString } from "../../main/Https/terraCentral/getActivityTime";

export const createActivityForTerra = (
  date: string,
  totalCalories: number,
  firestoreUser: UserInterface,
  createdOn?: number,
): Activity => {
  const createdOnUnix = getUnixDayStartForFormattedDate(date);
  const now = Date.now();
  return {
    calories: Math.round(totalCalories),
    fitPoints: 0,

    date: date,
    activityName: "cycling",
    authorUID: firestoreUser.uid,

    createdOn: createdOn ? createdOn : createdOnUnix,
    updatedOn: now,

    source: "terra",
    postId: uuidv4(),
  };
};

const updateTerraActivity = (
  prev: Activity,
  totalCalories: number,
  date: string,
): Activity => {
  const createdOnUnix = getUnixDayStartForFormattedDate(date);
  const now = Date.now();
  return {
    ...prev,
    calories: Math.round(totalCalories),

    createdOn: createdOnUnix,
    updatedOn: now,

    source: "terra",
  };
};

export const handleTerraActivity = async (
  date: string,
  totalCalories: number,
  firestoreUser: UserInterface,
  rawActivities: TerraActivity[],
) => {
  const terraActs = await getUserTerraActivities(firestoreUser.uid, date);
  console.log("previous terraActs", terraActs.length);

  if (terraActs.length === 0) {
    const newTerra = createActivityForTerra(date, totalCalories, firestoreUser);

    // console.log("newTerra", newTerra.calories);
    await saveNewActivity(firestoreUser.uid, newTerra, rawActivities);
  } else {
    const previousTerra = terraActs[0];

    const updatedCals = await getRawCalUpdate(
      terraActs,
      firestoreUser,
      rawActivities,
    );

    const updatedTerra = updateTerraActivity(previousTerra, updatedCals, date);
    // console.log("updatedTerra", updatedTerra.calories);
    await saveNewActivity(firestoreUser.uid, updatedTerra, rawActivities);
  }
};

const getRawCalUpdate = async (
  previousTerras: Activity[],
  firestoreUser: UserInterface,
  newTerra: TerraActivity[],
) => {
  // const summarisedTerraCal: number = 0;
  const rawActs: { [summary_id: string]: FirestoreTerra | TerraActivity } = {};
  const periods: { [periodString: string]: boolean } = {};
  for (const bucket of previousTerras) {
    const previousRaw = await getRawActivities(
      firestoreUser.uid,
      bucket.postId,
    );

    for (const raw of previousRaw) {
      const previousRawPeriodStr = getPeriodString(raw);
      if (raw.metadata.summary_id && !periods[previousRawPeriodStr]) {
        rawActs[raw.metadata.summary_id] = raw;

        periods[previousRawPeriodStr] = true;
      }
    }
  }

  for (const newRaw of newTerra) {
    const rawPeriodStr = getPeriodString(newRaw);
    if (newRaw.metadata.summary_id && !periods[rawPeriodStr]) {
      rawActs[newRaw.metadata.summary_id] = newRaw;

      periods[rawPeriodStr] = true;
    }
  }

  const sumCals = summariesTerraActivities(Object.values(rawActs));

  return sumCals;
};
