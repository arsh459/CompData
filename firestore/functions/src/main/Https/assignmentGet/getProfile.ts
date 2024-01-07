import { fetchOne } from "../../../utils/firestore/fetchOne";
import { postProfile } from "../assignmentPost/interface";

export const getProfile = async (uid: string) => {
  const res = await fetchOne("assignment", uid);

  if (res.exists) {
    return res.data() as postProfile;
  }

  return undefined;
};
