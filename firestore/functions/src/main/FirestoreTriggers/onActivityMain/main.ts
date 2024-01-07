import { Activity } from "../../../models/Activity/Activity";

// import { handleAlgoliaActivity } from "./algolia";
import { handleFPUpdateActivity } from "./fpUpdate";
import { handleActivityFlag } from "./handleWorkoutFlag";
import { handleSearchFix } from "./searchFix";
import { handleTicketActivity } from "./ticket";

export const mainFunc = async (uid: string, now: Activity, pre?: Activity) => {
  console.log("running", uid, now.activityName);
  //////////////////////////////////////
  // await handleAlgoliaActivity(now, pre);
  await handleSearchFix(uid, now);
  console.log("running search done", uid);

  await handleTicketActivity(now, pre);
  console.log("running ticket done", uid);
  //////////////////////////////////////

  //////////////////////////////////////
  // user fp update
  // 1 READ 1 WRITE && 2 READ 1 WRITE
  await handleFPUpdateActivity(uid, now, pre);
  //////////////////////////////////////

  //////////////////////////////////////
  await handleActivityFlag(now);
  //////////////////////////////////////
};
