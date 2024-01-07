// import {
//   CHALLENGE_ONE,
//   FAT_BURNER_CHALLENGE,
//   FAT_BURNER_GAME,
//   WFH_CHALLENGE,
// } from "../../../constants/challenge";
// import {
//   getChildEvents,
//   getSbEventById,
//   //   getSbEventById,
// } from "../../../models/sbEvent/getUtils";
// import { sbEventInterface } from "../../../models/sbEvent/sbEvent";
// import { getUserById } from "../../../models/User/Methods";
// import { UserInterface } from "../../../models/User/User";
import { userTeamMapping } from "./userTeamMap";
import * as admin from "firebase-admin";
import { getUserById } from "../../../models/User/Methods";
import { UserInterface } from "../../../models/User/User";
import { sbEventInterface } from "../../../models/sbEvent/sbEvent";
import { getSbEventById } from "../../../models/sbEvent/getUtils";

export const userTeamNormalise = async () => {
  const map = userTeamMapping;

  const users: { [uid: string]: UserInterface } = {};
  const teams: { [teamId: string]: sbEventInterface } = {};

  for (const item of map) {
    if (item["Keep Team"] === "Yes") {
      console.log(item.UID);
      if (!users[item.UID.trim()]) {
        const usr = await getUserById(item.UID.trim());
        if (usr) {
          users[item.UID.trim()] = usr;
        }
      }

      if (!teams[item.teamId.trim()]) {
        const tm = await getSbEventById(item.teamId.trim());
        if (tm) {
          teams[item.teamId.trim()] = tm;
        }
      }

      if (users[item.UID.trim()] && teams[item.teamId.trim()]) {
        const enrolledTimes = users[
          item.UID.trim()
        ].enrolledEventsWithTime?.filter(
          (item1) => item1.eventId === item.teamId.trim(),
        );

        let time: number = teams[item.teamId.trim()].createdOn;
        if (enrolledTimes && enrolledTimes?.length > 0) {
          time = enrolledTimes[0].enrolledTime;
        }

        console.log("time", time, item.teamId.trim(), item.UID.trim(), {
          participatingInGameWithTeam: {
            [item.gameId]: {
              teamId: item.teamId.trim(),
              ownerUID: teams[item.teamId.trim()].ownerUID,
              enrolledTime: time,
            },
          },
        });

        await admin
          .firestore()
          .collection("users")
          .doc(item.UID.trim())
          .update({
            [`participatingInGameWithTeam.${item.gameId}`]: {
              teamId: item.teamId.trim(),
              ownerUID: teams[item.teamId.trim()].ownerUID,
              enrolledTime: time,
            },
          });
      } else {
        console.log("skipped");
      }
    } else {
      // console.log("here");
    }
  }
};
