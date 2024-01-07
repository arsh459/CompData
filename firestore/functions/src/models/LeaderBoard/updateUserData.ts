import { setOne } from "../../utils/firestore/fetchOne";

export const updateUserDataLeader = async (
  uid: string,
  key: string,
  value: number | string | boolean
) => {
  await setOne(
    "leaderBoard",
    `leader-${uid}`,
    {
      uid: uid,
      [key]: value,
    },
    true
  );
};
