import type { NextApiRequest, NextApiResponse } from "next";
import { withSentry } from "@sentry/nextjs";
// import { parsePhoneQuery } from "server/checkPhone/parseQuery";
import { parseMergeQuery } from "server/mergeUsers/parseQuery";
import { UserInterface } from "@models/User/User";

const mergeUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // console.log("req", req.body);
    if (req.method === "POST") {
      const { phoneUID, annonymUID } = parseMergeQuery(req.body);

      if (phoneUID && annonymUID) {
        const firebase = (await import("@config/adminFire")).default;

        const db = firebase.firestore();

        const remoteUser = await db.collection("users").doc(annonymUID).get();

        if (remoteUser.data()) {
          const {
            name,
            gender,
            height,
            fitnessGoal,
            diagnosedPeriod,
            age,
            weight,
            desiredWeight,
            cycleLength,
            pcosSymptoms,
            workoutFrequency,
            currentBodyType,
            desiredBodyType,
            difficulty,
            paceOfAchievementInMonth,
            phone,
            onboarded,
            dailyFPTarget,
            dailyKCalTarget,
            dailyStepTarget,
            badgeId,
            // onboarded,
          } = remoteUser.data() as UserInterface;

          await db.collection("users").doc(phoneUID).update({
            name,
            gender,
            height,
            fitnessGoal,
            diagnosedPeriod,
            age,
            weight,
            desiredWeight,
            cycleLength,
            pcosSymptoms,
            workoutFrequency,
            currentBodyType,
            desiredBodyType,
            difficulty,
            paceOfAchievementInMonth,
            phone,
            onboarded,
            dailyFPTarget,
            dailyKCalTarget,
            dailyStepTarget,
            badgeId,

            uid: phoneUID,
          });
        }

        res.status(200).json({
          status: "success",
        });

        return;
      }
    }

    res.status(400).json({
      status: "failed",
    });

    return;
  } catch (error) {
    console.log("error in user checking", error);
    res.status(400).json({ error: "error" });
  }
};

export default withSentry(mergeUsers);
