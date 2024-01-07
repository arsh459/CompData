import { getUserActivitiesCalories } from "../../../models/Activity/getUtils";
import { updateUserTotalFp } from "../../../models/User/Methods";

export const fpUpdateHandler = async (uid: string) => {
  const userPositiveActs = await getUserActivitiesCalories(uid);

  let fps: number = 0;
  for (const userAct of userPositiveActs) {
    const fp = Math.round((userAct.calories ? userAct.calories : 0) / 300);

    fps += fp;
  }

  //   console.log("fps", fps);

  try {
    await updateUserTotalFp(uid, fps);
  } catch (error) {
    console.log("failed for uid", uid);
  }
};
