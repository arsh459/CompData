import * as functions from "firebase-functions";
import { setOne } from "../../../utils/firestore/fetchOne";

export const beforesigninfunc = functions.auth
  .user()
  .beforeSignIn(async (user) => {
    try {
      // const functionEventId = context.eventId;

      await setOne(
        "users",
        user.uid,
        {
          uid: user.uid,
          userLevelV2: 1,
          ...(user.phoneNumber ? { phone: user.phoneNumber } : {}),
          ...(user.email ? { email: user.email } : {}),
        },
        true,
      );
    } catch (error) {
      console.log("error", error);
    }
  });
