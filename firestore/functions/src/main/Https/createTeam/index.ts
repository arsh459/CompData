import * as functions from "firebase-functions";
import * as cors from "cors";

import { TEAM_ALPHABET_GAME } from "../../../constants/challenge";

import { getUserById } from "../../../models/User/Methods";

import { getSbEventById } from "../../../models/sbEvent/getUtils";
import { createNewTeam } from "../refreshUserLevels/createTeam";

const corsHandler = cors({ origin: true });
export const createUserTeamFunc = functions
  .region("asia-south1")
  .https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
      try {
        const body = request.query as { uid?: string };

        const game = await getSbEventById(TEAM_ALPHABET_GAME);
        if (body.uid) {
          const userObj = await getUserById(body.uid);

          if (userObj && game) {
            const teamName = userObj.name
              ? `${userObj.name.trim()}'s Team`
              : userObj.userKey
              ? `${userObj.userKey.trim()}'s team`
              : `New Team ${Math.round(Math.random() * 100000)}`;

            await createNewTeam(
              game,
              userObj,
              "",
              teamName,
              userObj.name,
              userObj.profileImage,
              userObj.uid,
            );

            return response.status(200).send({ status: "success" });
          }
        }

        return response.status(400).send({ error: "Invalid request" });
      } catch (error) {
        return response.status(400).send({ error: "Invalid request" });
      }
    });
  });
