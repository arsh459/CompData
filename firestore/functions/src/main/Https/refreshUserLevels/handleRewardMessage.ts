// import * as admin from "firebase-admin";
// import { FAT_BURNER_GAME } from "../../../constants/challenge";
import { sendHSM } from "../../../models/Conversations/sendHSM";
// import { LeaderBoard } from "../../../models/LeaderBoard/interface";
import {
  //   getChildEvents,
  getSbEventById,
  //   getSbEventById,
} from "../../../models/sbEvent/getUtils";
import { getUserById } from "../../../models/User/Methods";
import { whatsappChannelId } from "../messagebird/constants/identifiers";

export const handleRewardMessage = async () => {
  //   const mainGame = getSbEventById(FAT_BURNER_GAME);

  //   const allTeams = await getChildEvents(FAT_BURNER_GAME);

  const winners = [
    {
      uid: "ICnClNCtpldbxqmvDeTcwePdf4s2",
      rank: 1,
      rewardName: "MI Band 6",
      teamId: "82a8590b-17ba-48b5-a343-4e3e012249f1",
      baseLink: "https://socialboat.live",
      postId: "8c2586e7-cd26-4938-a825-5d954d2ca036",
      postEventId: "db718cb3-a122-4232-a2ea-864b69fb25d7",
    },
    {
      uid: "7wbH5PiGmhf2EzKiuSl3F0YBEO02",
      rank: 2,
      rewardName: "Decathlon Voucher (INR 2500)",
      teamId: "599eb22c-55c5-40ef-8d72-bd44cd65fec6",
      baseLink: "https://socialboat.live",
      postId: "8c2586e7-cd26-4938-a825-5d954d2ca036",
      postEventId: "db718cb3-a122-4232-a2ea-864b69fb25d7",
    },
    {
      uid: "NFoIbbtOIVTwdOj8S6FOCx5Wfz92",
      rank: 3,
      rewardName: "Decathlon Voucher (INR 1500)",
      teamId: "e209e5c7-dff6-4564-967b-2699fee96f44",
      baseLink: "https://socialboat.live",
      postId: "8c2586e7-cd26-4938-a825-5d954d2ca036",
      postEventId: "db718cb3-a122-4232-a2ea-864b69fb25d7",
    },
  ];

  let i: number = 0;
  for (const winner of winners) {
    const team = await getSbEventById(winner.teamId);

    const captain = await getUserById(team?.ownerUID ? team.ownerUID : "");

    const winnerUser = await getUserById(winner.uid);

    if (captain && team?.enrolledUserUIDs && winnerUser) {
      for (const enrolledUID of team.enrolledUserUIDs) {
        const user = await getUserById(enrolledUID);

        const isWinner = winners.filter((item) => item.uid === user?.uid);

        if (user?.uid && user.phone && isWinner.length === 0) {
          console.log(i, [
            { default: `${user.name ? user.name.trim() : "there"}` },
            { default: `*${winnerUser.name ? winnerUser.name : "member"}*` },
            { default: `*Weekly Rank ${winner.rank}*` },
            { default: `${winner.rewardName}` },
            {
              default: encodeURI(
                `${winner.baseLink}/${captain.userKey}/${team.eventKey}?nav=program&parentPostId=${winner.postId}&postEventId=${winner.postEventId}`,
              ),
            },
          ]);

          // if (i === 0) {
          await sendHSM(
            user.phone,
            // "+919811800046",

            whatsappChannelId,
            "reward_update",
            [
              { default: `${user.name ? user.name.trim() : "there"}` },
              {
                default: `*${winnerUser.name ? winnerUser.name : "member"}*`,
              },
              { default: `*Weekly Rank ${winner.rank}*` },
              { default: `${winner.rewardName}` },
              {
                default: encodeURI(
                  `${winner.baseLink}/${captain.userKey}/${team.eventKey}?nav=program&parentPostId=${winner.postId}&postEventId=${winner.postEventId}`,
                ),
              },
            ],
          );
          // }

          i += 1;
        }
      }
    }
  }
};
