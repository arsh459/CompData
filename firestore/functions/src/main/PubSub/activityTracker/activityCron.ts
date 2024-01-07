import * as functions from "firebase-functions";
// import { TerraUser } from "../../../models/Terra/TerraUser";
// import { getUsersWithTerraTag } from "../../../models/User/Methods";
// import { getAllTerraUsers } from "./getAllSubscribedUsers";
// import { triggerUpdates } from "./triggerUpdates";
// import { get1159Adder, getDayStartIST } from "./utils";

export const activityCronFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540 })
  .pubsub.schedule("*/10 * * * *")
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    try {
      // const now = Date.now();
      // console.log("unix", unix);
      // const now = getNowISTTime();
      // const formatted = formatDate(now);
      // const firestoreTerraUsers = await getUsersWithTerraTag();
      // const terraUsers: TerraUser[] = [];
      // for (const firestoreTerraUser of firestoreTerraUsers) {
      //   if (firestoreTerraUser.terraUser)
      //     terraUsers.push(firestoreTerraUser.terraUser);
      // }
      // const terraUsers = await getAllTerraUsers();
      // await triggerUpdates(
      //   firestoreTerraUsers,
      //   unix,
      //   unix + get1159Adder(),
      //   true,
      // );
    } catch (error) {
      functions.logger.error("Not updating Views");
    }
    return null;
  });
