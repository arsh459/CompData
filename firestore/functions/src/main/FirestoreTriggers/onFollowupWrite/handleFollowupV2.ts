import { getLatestFollowup } from "./getUtils";
import * as admin from "firebase-admin";
import { mixpanel } from "../../../mixpanel/mixpanel";

export const handleFollowupV2 = async (uid: string) => {
  const lastFollow = await getLatestFollowup(uid);

  if (lastFollow && lastFollow.followupTime) {
    await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .update({
        ...(lastFollow.followupTime
          ? { lastFollowupTime: lastFollow.followupTime }
          : {}),
        ...(lastFollow.followupTime
          ? { nextFollowupTime: lastFollow.followupTime }
          : {}),
      });

    await mixpanel.people.set(
      uid,
      {
        ...(lastFollow.followupTime
          ? { lastFollowupTime: new Date(lastFollow.followupTime) }
          : {}),
      },
      { $ignore_time: true },
    );
  }
};
