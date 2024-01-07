import { getAllUsersWithFit, saveCronFit } from "../../../models/User/Methods";
import { fitCheck } from "../../Https/googleFit/fitCheck";
import { mainGoogleFit } from "../../Https/googleFit/mainHandler";

export const handleFitUpdates = async () => {
  // get all googlefit users
  const userObjs = await getAllUsersWithFit();
  const now = Date.now();
  const now_30 = now - 30 * 60 * 1000;

  for (const user of userObjs) {
    const { googleFit } = fitCheck(user);

    // should make query
    if (user.lastCronRun && user.lastCronRun > now_30) {
      console.log("will run after 30 minutes");
    } else {
      if (googleFit) {
        try {
          const resp = await mainGoogleFit(user.uid, googleFit);
          if (resp?.status) {
            await saveCronFit(user.uid);
          }
        } catch (error) {
          console.log("fit errored", user.uid, user.name);
        }
      }
    }
  }
};
