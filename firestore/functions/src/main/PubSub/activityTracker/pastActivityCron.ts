import * as functions from "firebase-functions";
// import { getUsersWithTerraTag } from "../../../models/User/Methods";
// import { triggerPastUpdates } from "./triggerUpdates";
// import { formatDate, getNowISTTime } from "./utils";

export const pastActivityCronFunc = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540, memory: "1GB" })
  .pubsub.schedule("0 */2 * * *")
  // .pubsub.schedule("*/10 * * * *")
  .onRun(async () => {
    try {
      //   const now = getNowISTTime();
      //   const formatted = formatDate(now);
      // const firestoreTerraUsers = await getUsersWithTerraTag();
      // const terraUsers = await getAllTerraUsers();
      // await triggerPastUpdates(firestoreTerraUsers, true);
    } catch (error) {
      console.log("Not updating Views");
    }
    return null;
  });
