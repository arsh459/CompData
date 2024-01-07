import * as functions from "firebase-functions";
import { setOne } from "../../../utils/firestore/fetchOne";

export const onNewUserFunc = functions.auth.user().onCreate(async (user) => {
  try {
    // const functionEventId = context.eventId;

    const signUpUnix = new Date(user.metadata.creationTime).getTime();
    const signInUnix = new Date(user.metadata.lastSignInTime).getTime();

    await setOne(
      "users",
      user.uid,
      {
        uid: user.uid,
        userLevelV2: 1,
        authSignupTime: signUpUnix,
        authSigninTime: signInUnix,
        ...(user.phoneNumber ? { phone: user.phoneNumber } : {}),
        ...(user.email ? { email: user.email } : {}),
      },
      true,
    );

    // await setOne(
    //   "users",
    //   user.uid,
    //   {
    //     uid: user.uid,
    //     ...(user.phoneNumber ? { phone: user.phoneNumber } : {}),
    //     ...(user.email ? { email: user.email } : {}),
    //   },
    //   true,
    // );
    await setOne(
      "leaderBoard",
      `leader-${user.uid}`,
      {
        uid: user.uid,
      },
      true,
    );
  } catch (error) {
    console.log("error", error);
  }
});
