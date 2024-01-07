import {
  CHALLENGE_ONE,
  FAT_BURNER_CHALLENGE,
  FAT_BURNER_GAME,
  WFH_CHALLENGE,
} from "../../../constants/challenge";
import {
  getChildEvents,
  getSbEventById,
  //   getSbEventById,
} from "../../../models/sbEvent/getUtils";
import { sbEventInterface } from "../../../models/sbEvent/sbEvent";
import { getUserById } from "../../../models/User/Methods";
import { UserInterface } from "../../../models/User/User";
import * as admin from "firebase-admin";

export const userTeamReconcile = async () => {
  await gameTeamReconcile(CHALLENGE_ONE, "5k Challenge");
  await gameTeamReconcile(WFH_CHALLENGE, "WFH Challenge");
  await gameTeamReconcile(FAT_BURNER_CHALLENGE, "Fat Burner Challenge");
  await gameTeamReconcile(FAT_BURNER_GAME, "Fat Burner Game");
};

const gameTeamReconcile = async (eventId: string, key: string) => {
  // console.log("GAME", eventId);
  const teams = await getChildEvents(eventId);

  const userInTeams: { [uid: string]: string } = {};
  const allUserTeams: {
    [uid: string]: {
      user: UserInterface;
      teamIds: string[];
      team: sbEventInterface;
    };
  } = {};
  const duplicateUsers: {
    [uid: string]: { user: UserInterface; teamIds: string[] };
  } = {};

  for (const team of teams) {
    // console.log(team.name);
    if (team.enrolledUserUIDs) {
      for (const teamMember of team.enrolledUserUIDs) {
        // const member = await getUserById(teamMember);

        if (userInTeams[teamMember]) {
          const member = await getUserById(teamMember);

          if (member) {
            if (duplicateUsers[teamMember]) {
              duplicateUsers[teamMember] = {
                ...duplicateUsers[teamMember],
                teamIds: [...duplicateUsers[teamMember].teamIds, team.id],
              };
              allUserTeams[teamMember] = {
                ...allUserTeams[teamMember],
                teamIds: [...allUserTeams[teamMember].teamIds, team.id],
              };
            } else {
              duplicateUsers[teamMember] = {
                user: member,
                teamIds: [team.id, userInTeams[teamMember]],
              };
              allUserTeams[teamMember] = {
                user: member,
                teamIds: [team.id, userInTeams[teamMember]],
                team: team,
              };
            }
          }

          // console.log(team.name, member?.name);
          //   console.log(member?.enrolledEventsWithTime);
          //   console.log("");
          //   console.log("");
        } else {
          const member = await getUserById(teamMember);
          if (member) {
            userInTeams[teamMember] = team.id;
            allUserTeams[teamMember] = {
              user: member,
              teamIds: [team.id],
              team: team,
            };
          }
        }

        // console.log(team.name, teamMember, "member", member?.name);
        // console.log("pa", member?.participatingWithObj);
      }
    }
  }

  for (const uid of Object.keys(allUserTeams)) {
    console.log("uid", uid, allUserTeams[uid].teamIds);
    if (allUserTeams[uid].teamIds.length === 1) {
      const enrolledTimes = allUserTeams[
        uid
      ].user.enrolledEventsWithTime?.filter(
        (item1) => item1.eventId === allUserTeams[uid].teamIds[0],
      );

      let time: number = allUserTeams[uid].team.createdOn;
      if (enrolledTimes && enrolledTimes?.length > 0) {
        time = enrolledTimes[0].enrolledTime;
      }

      console.log("time", time, {
        participatingInGameWithTeam: {
          [eventId]: {
            teamId: allUserTeams[uid].teamIds[0],
            ownerUID: allUserTeams[uid].team.ownerUID,
            enrolledTime: time,
          },
        },
      });

      await admin
        .firestore()
        .collection("users")
        .doc(uid)
        .update({
          [`participatingInGameWithTeam.${eventId}`]: {
            teamId: allUserTeams[uid].teamIds[0],
            ownerUID: allUserTeams[uid].team.ownerUID,
            enrolledTime: time,
          },
        });
    }
  }

  console.log("");
  console.log("");

  await consoleDuplicateTeams(duplicateUsers, key);

  // console.log("");
  // console.log("");
};

const consoleDuplicateTeams = async (
  duplicateUsers: {
    [uid: string]: { user: UserInterface; teamIds: string[] };
  },
  key: string,
) => {
  const duplicateTeams: { [teamId: string]: sbEventInterface } = {};

  for (const duplicateUserId of Object.keys(duplicateUsers)) {
    for (const teamId of duplicateUsers[duplicateUserId].teamIds) {
      if (duplicateTeams[teamId]) {
        console.log(
          duplicateUsers[duplicateUserId].user.name,
          " | ",
          duplicateTeams[teamId].name ? duplicateTeams[teamId].name : "No name",
          " | ",
          duplicateTeams[teamId].eventKey,
        );
      } else {
        const remoteTeam = await getSbEventById(teamId);
        if (remoteTeam) {
          console.log(
            duplicateUsers[duplicateUserId].user.name,
            " | ",
            remoteTeam.name ? remoteTeam.name : "No name",
            " | ",
            remoteTeam.eventKey,
            " | ",
            key,
            " | ",
            duplicateUsers[duplicateUserId].user.uid,
            " | ",
            remoteTeam.id,
            " | ",
            remoteTeam.parentId,
          );
        }
      }
    }
  }
};
