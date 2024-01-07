import * as functions from "firebase-functions";
import * as cors from "cors";
import { getAllUsers_ByCollection } from "../../../../models/User/Methods";
import { reconcileSingleLeaderUser } from "./handleReconcile";
// import { UserInterface } from "../../../../models/User/User";

const corsHandler = cors({ origin: true });
export const reconcileEarningsForAllUsers = functions
  .region("asia-south1")
  .runWith({ timeoutSeconds: 540, memory: "1GB" })
  // .runWith({memory: '1GB', timeoutSeconds: })
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        // const result: moveListingInterface = request.body;
        // const allListings = await getAllListings();
        const allUsers = await getAllUsers_ByCollection();
        for (let i = 0; i < allUsers.length; i++) {
          // const user: UserInterface = {
          //   uid: "Rf6IsSfaHpOK6gFco3QOgOo9JD93",
          // };
          const user = allUsers[i];
          if (user.uid) {
            await reconcileSingleLeaderUser(user);
          }

          console.log(`${i}/${allUsers.length}`, user.uid);
        }

        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
