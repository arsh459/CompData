import * as functions from "firebase-functions";
import * as cors from "cors";
import { getUserById } from "../../../models/User/Methods";
import { createUserStoreLink } from "../../../user/addInviteURL";
import { setOne } from "../../../utils/firestore/fetchOne";

const corsHandler = cors({ origin: true });
export const addInviteURLToUserFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      // console.log(request.body);
      try {
        const result: { [uid: string]: string } = request.body;

        const userObj = await getUserById(result.uid);

        if (userObj) {
          const newURL = await createUserStoreLink(
            userObj.uid,
            "influencer",
            userObj.name,
            userObj.bio,
            userObj.imageURI,
            userObj.instagramHandle,
          );

          if (newURL) {
            await setOne("users", userObj.uid, { inviteURL: newURL }, true);
          }
        }

        // server error
        return response.status(200).send({ status: "success" });
      } catch (error) {
        console.log(error);
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
