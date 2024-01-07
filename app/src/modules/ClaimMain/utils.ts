import { v4 as uuidv4 } from "uuid";
import firestore from "@react-native-firebase/firestore";
import { format, startOfDay } from "date-fns";
export const updateDailyRewards = async (
  uid?: string,
  todayUnix?: number,
  dailyRewardId?: string,
  day?: number,
  fp?: number
) => {
  if (
    !(
      uid &&
      todayUnix &&
      dailyRewardId &&
      typeof day === "number" &&
      typeof fp === "number"
    )
  ) {
    return;
  }
  const getDailyRewardObject = (todayUnix: number) => {
    const todayDate = format(todayUnix, "yyyy-MM-dd");
    const uniqueId = uuidv4();
    const unixStartDay = startOfDay(todayUnix).getTime();

    return {
      updatedObject: {
        date: todayDate,
        id: uniqueId,
        dailyRewardId,
        unix: unixStartDay,
        day,

        fp,
      },
      uniqueId,
    };
  };
  const { updatedObject, uniqueId } = getDailyRewardObject(todayUnix);
  try {
    await firestore()
      .collection("users")
      .doc(uid)
      .collection("dailyReward")
      .doc(uniqueId)
      .set(updatedObject);

    console.log(
      `Document with ID ${uniqueId} updated successfully.`,
      updatedObject
    );
  } catch (error) {
    console.error(`Error updating document with ID ${uniqueId}: ${error}`);
  }
};
