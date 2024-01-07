import axios from "axios";
import { BACKEND_URL } from "react-native-dotenv";

export const makeGeneratorCall = async (
  uid: string,
  type: "workout" | "nutrition",
  recreate?: boolean,
  deletePrevious?: boolean,
  badgeId?: string
) => {
  const resp = await axios({
    url: `${BACKEND_URL}/taskGenerator`,
    method: "POST",
    params: {
      uid: uid,
      days: 7,
      startToday: true,
      type,
      ...(recreate ? { recreate: recreate } : {}),
      ...(deletePrevious ? { deletePrevious: deletePrevious } : {}),
      ...(badgeId ? { badgeId } : {}),
    },
    data: {
      uid: uid,
      days: 7,
      startToday: true,
      type,
      ...(recreate ? { recreate: recreate } : {}),
      ...(deletePrevious ? { deletePrevious: deletePrevious } : {}),
      ...(badgeId ? { badgeId } : {}),
    },
  });

  return resp.data as { status?: "success" };
};
