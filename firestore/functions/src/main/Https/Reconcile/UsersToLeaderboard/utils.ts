// import * as admin from 'firebase-admin';
import { getLeaderboardEntry } from "../../../../models/LeaderBoard/Methods";
import { UserInterface } from "../../../../models/User/User";
import { createUserStoreLink } from "../../../../user/addInviteURL";
import { updateUserLedgerEntry } from "../../../FirestoreTriggers/onUserUpdate/leaderboardUpdate";

export const reAddInviteURLs = async (users: UserInterface[]) => {
  for (let i = 0; i < users.length; i++) {
    // add influencer tag
    if (users[i].userType !== "influencer") {
      const leaderEntry = await getLeaderboardEntry(users[i].uid);

      if (leaderEntry && !leaderEntry.inviteURL) {
        const inviteURL = await createUserStoreLink(
          users[i].uid,
          "influencer",
          users[i].name,
          users[i].bio,
          users[i].imageURI,
          users[i].instagramHandle,
        );

        await sleep(200);

        console.log("inviteURL", i, users[i].uid, inviteURL);

        if (inviteURL) {
          await updateUserLedgerEntry(users[i], inviteURL);
        }
      }
    }
  }
};

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
