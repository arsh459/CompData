import { updateNameImageInRank_ByRef } from "../../../models/Activity/createUtils";
import { getUserRankV2ByUID_docs } from "../../../models/Rounds/getUserRankV2";
import { UserInterface } from "../../../models/User/User";

export const updateUserRankNameImgV2 = async (
  now: UserInterface,
  prev: UserInterface,
) => {
  if (
    now.name &&
    (now.name !== prev.name || now.profileImage !== prev.profileImage)
  ) {
    const userRankDocs = await getUserRankV2ByUID_docs(now.uid);
    for (const userRankDoc of userRankDocs) {
      const docRef = userRankDoc.ref;

      await updateNameImageInRank_ByRef(docRef, now.name, now.profileImage);
    }
  }
};
