import { getAllSocialboatUsers } from "../../../models/User/Methods";
// import { getUserActivities } from "../../../models/Activity/getUtils";
import { addUIDToEvent } from "../../../models/sbEvent/getUtils";

export const refreshHandler = async () => {
  const allSocialBoatUsers = await getAllSocialboatUsers();
  let i: number = 0;
  let j: number = 0;
  let numActs: number = 0;
  let usersWithAtLeastOneAct: number = 0;
  for (const user of allSocialBoatUsers) {
    //   console.log("user", user.name);
    if (
      user.name &&
      user.enrolledEvents?.length &&
      user.enrolledEvents.length >= 1
    ) {
      console.log("user", user.name, user.enrolledEvents.length);
      i++;
      if (user.enrolledEvents.length >= 2) {
        j++;
      }

      for (const eventId of user.enrolledEvents) {
        await addUIDToEvent(user.uid, eventId);
      }

      // const act = await getUserActivities(user.uid);
      // console.log("act", act.length);
      // numActs = numActs + act.length;

      // if (act.length >= 1) {
      //   usersWithAtLeastOneAct++;
      // }
    }
  }

  console.log("allSocialBoatUsers", allSocialBoatUsers.length, i, j);
  console.log("Users with atleast 1 event", i, j);
  console.log("Users with atleast 2 event", j);
  console.log("num activities", numActs);
  console.log("Users with atleast 1 act", usersWithAtLeastOneAct);
};
