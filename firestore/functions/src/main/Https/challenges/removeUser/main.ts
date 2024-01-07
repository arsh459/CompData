import {
  getUserRankV2ByUID_docs,
  removeUserRank_doc,
} from "../../../../models/Rounds/getUserRankV2";
import { UserRankV2 } from "../../../../models/Rounds/interface";
import { removeChallengeJoinedTime } from "../../../../models/User/Methods";
import { refreshMain } from "../refresh/main";

export const removeUserMain = async (uid: string) => {
  const docs = await getUserRankV2ByUID_docs(uid);

  for (const doc of docs) {
    const rk = doc.data() as UserRankV2;
    console.log("deleting", rk.name, rk.rank, rk.lvl);
    await removeUserRank_doc(doc);
  }

  // challenge joined
  await removeChallengeJoinedTime(uid);

  for (const lvl of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
    console.log("refreshing", lvl, "lvl");
    await refreshMain(lvl);
  }

  return true;
};
