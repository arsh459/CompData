import { UserRank } from "../../../models/Activity/Activity";
import { getAllUserRanks } from "../../../models/Activity/getUtils";
import { getChildEvents } from "../../../models/sbEvent/getUtils";
import { sbEventInterface } from "../../../models/sbEvent/sbEvent";
import { getUserById } from "../../../models/User/Methods";
import { UserInterface } from "../../../models/User/User";
// import { UserInterface } from "../../../models/User/User";

export interface RankProcessingObject {
  rank?: UserRank;
  action: "RECONCILE" | "UPDATE" | "NO_CHANGE";
  uid: string;
  team?: sbEventInterface;
  coach?: UserInterface;
  //   user: UserInterface;
}

export const createRankTaskList = async (
  eventId: string,
): Promise<RankProcessingObject[]> => {
  const rankTasks: RankProcessingObject[] = [];

  const currentRanks = await getAllUserRanks(eventId);

  const rankObj = convertToObj(currentRanks);

  const childEvents = await getChildEvents(eventId);
  const addedRanks: { [uid: string]: boolean } = {};
  const coaches: { [uid: string]: UserInterface | undefined } = {};

  //   const usersOnBoard: { [uid: string]: boolean } = {};
  // W1mm9HjTo8apZ11Qes9Mt8ckhpD3

  for (const childEvent of childEvents) {
    // console.log("c", childEvent.enrolledUserUIDs);
    if (childEvent.enrolledUserUIDs) {
      for (const uid of childEvent?.enrolledUserUIDs) {
        // only once someone can participate
        if (addedRanks[uid]) {
          continue;
        }

        // if (uid === "W1mm9HjTo8apZ11Qes9Mt8ckhpD3") {
        //   console.log("event", childEvent.name);
        // }

        // get coach
        if (!coaches[childEvent.ownerUID]) {
          coaches[childEvent.ownerUID] = await getUserById(childEvent.ownerUID);
        }

        if (rankObj[uid]) {
          // EXISTS
          rankTasks.push({
            rank: rankObj[uid],
            action: "UPDATE",
            uid: uid,
            team: childEvent,
            coach: coaches[childEvent.ownerUID],
          });
        } else {
          // is not present
          rankTasks.push({
            rank: undefined,
            action: "RECONCILE",
            uid: uid,
            team: childEvent,
            coach: coaches[childEvent.ownerUID],
          });
        }

        addedRanks[uid] = true;
      }
    }
  }

  for (const userRank of currentRanks) {
    if (!addedRanks[userRank.uid]) {
      // get coach
      if (!coaches[userRank.coachCommunityId]) {
        coaches[userRank.coachCommunityId] = await getUserById(
          userRank.coachCommunityId,
        );
      }

      // left the game
      rankTasks.push({
        rank: userRank,
        action: "NO_CHANGE",
        uid: userRank.uid,
        coach: coaches[userRank.coachCommunityId],
      });

      addedRanks[userRank.uid] = true;
    }
  }

  console.log("COACHES READ:", Object.keys(coaches).length);

  return rankTasks;
};

const convertToObj = (userRanks: UserRank[]) => {
  const responseObj: { [uid: string]: UserRank } = {};
  return userRanks.reduce((acc, item) => {
    return {
      ...acc,
      [item.uid]: item,
    };
  }, responseObj);
};
