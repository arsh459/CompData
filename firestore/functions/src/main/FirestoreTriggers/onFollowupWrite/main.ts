import { getAllFollowups } from "./getUtils";
import * as admin from "firebase-admin";
import { mixpanel } from "../../../mixpanel/mixpanel";

export const handleFollowup = async (uid: string) => {
  const allFollows = await getAllFollowups(uid);

  console.log("allFollows", allFollows.length);

  const nowTime = Date.now();
  let nextFollowupTime: number | undefined;
  let lastFollowupTime: number | undefined;
  for (const follow of allFollows) {
    console.log("follow", follow);

    if (follow.followupTime > nowTime) {
      console.log("future");
      nextFollowupTime = follow.followupTime;
      break;
    }

    // old
    if (follow.followupTime <= nowTime) {
      console.log("past");
      lastFollowupTime = follow.followupTime;
    }
  }

  console.log("lastFollowupTime", lastFollowupTime);
  console.log("nextFollowupTime", nextFollowupTime);

  // next time available
  if (nextFollowupTime || lastFollowupTime) {
    await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .update({
        ...(lastFollowupTime ? { lastFollowupTime } : {}),
        ...(nextFollowupTime ? { nextFollowupTime } : {}),
      });

    await mixpanel.people.set(
      uid,
      {
        ...(lastFollowupTime
          ? { lastFollowupTime: new Date(lastFollowupTime) }
          : {}),
        ...(nextFollowupTime
          ? { nextFollowupTime: new Date(nextFollowupTime) }
          : {}),
      },
      { $ignore_time: true },
    );
  }
};
