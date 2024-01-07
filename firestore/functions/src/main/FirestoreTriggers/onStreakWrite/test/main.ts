import * as admin from "firebase-admin";

import { StreakDataInterface } from "../../../../models/Streak/streakInterface";
import { mixpanel } from "../../../../mixpanel/mixpanel";

export const reconcileMixpanelStreakData = async () => {
  const allStreaks = await getAllStreaks();

  for (const streakDoc of allStreaks.docs) {
    const uid = streakDoc.ref.path.split("/")[1];

    const streakObj = streakDoc.data() as StreakDataInterface;

    console.log(
      "uid",
      uid,
      "days",
      streakObj.days,
      "status",
      streakObj.streakStatus,
      "startedOn",
      streakObj.startedOn,
      "activeTill",
      streakObj.activeTill,
    );

    await mixpanel.people.set(
      uid,
      {
        currentStreakLength: streakObj.days,
        lastStreakStarted: new Date(streakObj.startedOn),
        streakStatus: streakObj.streakStatus,

        ...(streakObj.streakStatus === "inactive"
          ? {
              lastStreakEnded: new Date(streakObj.activeTill),
            }
          : {}),
      },
      { $ignore_time: true },
    );

    // console.log("streak", streak.days, streak);
  }
};

const getAllStreaks = async () => {
  //   const streakDocs: StreakDataInterface[] = [];
  const docs = await admin.firestore().collectionGroup("streaks").get();

  return docs;
  //   for (const doc of docs.docs) {
  //     streakDocs.push();
  //   }

  //   return streakDocs;
};
