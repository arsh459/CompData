import { getUserById } from "../../../models/User/Methods";
import { sleep } from "../../FirestoreTriggers/onLiveWorkoutUpdate/handleLiveUpdate";
import { FBEventInterfaceRequest } from "./interface";
import { getMixpanelUser } from "./request/getMixpanelUser";
import { hashRequestData } from "./request/hashRequest";
import { makeConversionRequest } from "./request/makeConversionRequest";
import { makeFBRequestData } from "./request/makeFBRequestData";
import { consoleFBEvent } from "./request/utils";
import { updateUserAtt } from "./updateUser";

export const mainFBEvent = async (
  data: FBEventInterfaceRequest,
  test_event_code?: string,
): Promise<{
  status: boolean;
  reason?: string;
}> => {
  // get user
  const { user, status, reason } = await getUserWithRetry(data.user_data.uid);
  if (!user) {
    return {
      status,
      reason,
    };
  }

  const mpUser = await getMixpanelUser(user.uid, data.mixpanelDistinctId);
  console.log("MIXPANEL USER", mpUser?.$distinct_id);

  const formattedEventData = makeFBRequestData(user, data, mpUser);
  consoleFBEvent(formattedEventData);

  const hashedOutput = hashRequestData(formattedEventData);

  // console.log();
  // console.log();
  // console.log();
  // console.log("hashedOutput FORMATTED", Object.keys(formattedEventData).length);

  try {
    await makeConversionRequest(hashedOutput, test_event_code);
  } catch (error) {
    console.log("ERROR MAKING CONVERSION CALL, TRYING AGAIN");
    console.log("error", error);

    try {
      await makeConversionRequest(hashedOutput, test_event_code);
    } catch (error) {
      console.log("ERROR MAKING CONVERSION CALL");
      console.log("error 2", error);
    }
  }

  await updateUserAtt(formattedEventData, user.uid, user.attribution);

  return {
    status: true,
  };
};

const getUserWithRetry = async (uid: string) => {
  const user = await getUserById(uid);
  console.log("USER", user?.name, user?.phone, user?.email);
  if (user) {
    return { user };
  }

  console.log("CANCEL REQUEST: NO USER", uid);
  await sleep(3000);
  console.log("TRYING AGAIN");
  const user2 = await getUserById(uid);

  if (user2) {
    return { user: user2 };
  }

  console.log("CANCEL REQUEST: NO USER AGAIN", uid);
  await sleep(3000);
  console.log("TRYING AGAIN 2");
  const user3 = await getUserById(uid);

  if (user3) {
    return { user: user3 };
  }

  console.log("CANCEL REQUEST: NO USER AGAIN", uid);
  await sleep(3000);
  console.log("TRYING AGAIN 3");
  const user4 = await getUserById(uid);

  if (user4) {
    return { user: user4 };
  }

  return {
    status: false,
    reason: "User not present",
    user: undefined,
  };
};
