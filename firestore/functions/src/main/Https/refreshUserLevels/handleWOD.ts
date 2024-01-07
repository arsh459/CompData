// import * as admin from "firebase-admin";
import { WOMENS_GAME } from "../../../constants/challenge";
// import { RUNNER_GAME } from "../../../constants/challenge";
// import { sendHSM } from "../../../models/Conversations/sendHSM";
// import { LeaderBoard } from "../../../models/LeaderBoard/interface";
import {
  getChildEvents,
  //   getChildEvents,
  //   getSbEventById,
  //   getSbEventById,
} from "../../../models/sbEvent/getUtils";
import { getUserById, getUsersForEvent } from "../../../models/User/Methods";
// import { whatsappChannelId } from "../messagebird/constants/identifiers";

export const handleWOD = async () => {
  const fitPoints = 5;
  // const taskId = "d6025f98-c9bf-4cc2-9dba-f0e15951fc0b";
  const taskId = "9783eb64-618c-4b4e-9eb7-10d6f32759b4";
  const game = WOMENS_GAME;
  const summaryType = "strength";

  //www.socialboat.live/Sportsfit_rajnagar/Sports%20Fit%20Raj%20Nagar-3473/workout?tab=task_preview&summaryType=strength&taskId=
  // "ff0d9668-2111-4ae0-a8d3-c727f1a3f6ec";
  // https://www.socialboat.live/swapnilvats/Fast%20and%20Furious%20-8572/workout?tab=task_preview&summaryType=cardio&taskId=48fbd0c6-a41e-49ad-be78-967ae0dfc6fc
  //www.socialboat.live/swapnilvats/The%20Avengers%20-3057/workout?tab=task_preview&summaryType=strength&taskId=450cd6d1-3f68-49b5-9e56-372b43a07222
  //www.socialboat.live/swapnilvats/The%20Avengers%20-3057/workout?tab=task_preview&summaryType=agility&taskId=
  // "https://www.socialboat.live/swapnilvats/The%20Avengers%20-3057/workout?tab=media_task&taskId=87b5d374-f7c5-488e-9852-b05aa89a0e39";
  // "https://www.socialboat.live/swapnilvats/The%20Avengers%20-3057/workout?tab=media_task&taskId=cf0060ab-b65b-4e83-9ad0-6e969b69440e";
  // "https://www.socialboat.live/swapnilvats/The%20Avengers%20-3057/workout?tab=media_task&taskId=048882bc-2c44-4c17-8611-b69e87735e83";

  const allTeams = await getChildEvents(game);

  let i: number = 0;
  for (const remTeam of allTeams) {
    // console.log("remTeam", remTeam);
    const users = await getUsersForEvent(remTeam.id);

    const captain = await getUserById(remTeam.ownerUID);

    for (const user of users) {
      //   console.log(
      //     "user",
      //     user.phone,
      //     captain?.name,
      //     captain?.userKey,
      //     remTeam.eventKey,
      //   );

      i++;
      if (
        // i >= 443 &&
        user.phone &&
        captain &&
        captain.userKey &&
        remTeam.eventKey &&
        !user.unsubscribe
        // user.phone === "+919811800046"
      ) {
        console.log(i, [
          { default: `${user.name ? user.name.trim() : "there"}` },
          {
            default: `*${fitPoints}*`,
          },
          {
            default: encodeURI(
              `https://socialboat.live/${captain.userKey}/${remTeam.eventKey}/workout?tab=task_preview&summary_type=${summaryType}&taskId=${taskId}`,
            ),
          },
          {
            default: `${remTeam.name}`,
          },
        ]);

        // await sendHSM(
        //   // "+919811800046",
        //   user.phone,

        //   whatsappChannelId,
        //   "start_game",
        //   [
        //     { default: `${user.name ? user.name.trim() : "there"}` },
        //     { default: `The SuperWoman Game` },
        //     {
        //       default: encodeURI(
        //         `https://socialboat.live/${captain.userKey}/${remTeam.eventKey}/workout`,
        //       ),
        //     },
        //     {
        //       default: encodeURI(
        //         `https://socialboat.live/${captain.userKey}/${remTeam.eventKey}`,
        //       ),
        //     },
        //   ],
        // );

        // throw new Error();

        // await sendHSM(user.phone, whatsappChannelId, "task_of_day_v2", [
        //   { default: `${user.name ? user.name.trim() : "there"}` },
        //   {
        //     default: `*${fitPoints}*`,
        //   },
        //   {
        //     default: encodeURI(
        //       `https://socialboat.live/${captain.userKey}/${remTeam.eventKey}/workout?tab=task_preview&summary_type=${summaryType}&taskId=${taskId}`,
        //     ),
        //   },
        //   {
        //     default: `${remTeam.name ? remTeam.name : "SocialBoat"}`,
        //   },
        // ]);
      }
    }
  }
};
