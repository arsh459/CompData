import { UserInterface } from "../../../../models/User/User";
import { Achiever } from "../../../../models/awards/interface";
import * as admin from "firebase-admin";
import { sendNotification } from "../../../../utils/notifications";
import { NotifeeData } from "../../../../models/Notifications/interface";
import { updateNotificationUserDB } from "../../../../models/Notifications/updateNotificationUserDB";
import { getAwardById } from "../../../../models/awards/getUtils";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";
import { sendHSMV2 } from "../../../../models/Conversations/sendHSMV2";
import {
  toJaytiPhone,
  toSauravPhone,
  toSwapnilPhone,
} from "../../../../constants/email/contacts";

export const updateAchieversInDB = async (
  achievers: Achiever[],
  nowWon: Achiever[],
  nowLost: Achiever[],
  user: UserInterface,
  completedTargets?: number,
) => {
  const batch = admin.firestore().batch();

  for (const achiever of achievers) {
    batch.update(admin.firestore().collection("achievers").doc(achiever.id), {
      ...achiever,
    });
  }

  const wonIds: string[] = [];
  for (const achiever of nowWon) {
    batch.update(admin.firestore().collection("achievers").doc(achiever.id), {
      ...achiever,
    });

    wonIds.push(achiever.id);
  }

  const lostIds: string[] = [];
  for (const achiever of nowLost) {
    batch.set(
      admin.firestore().collection("achievers").doc(achiever.id),
      achiever,
    );

    lostIds.push(achiever.id);
  }

  const finalList: string[] = user.unseenAwards ? user.unseenAwards : [];
  for (const wonId of wonIds) {
    finalList.push(wonId);
  }

  for (const lostId of lostIds) {
    finalList.filter((item) => item !== lostId);
  }

  batch.update(admin.firestore().collection("users").doc(user.uid), {
    unseenAwards: finalList,
    completedTargets: completedTargets ? completedTargets : 0,
  });

  await batch.commit();
  await pushNotificationForAward(user, nowWon);
  await pushNotificationForLostAward(user, nowLost);
  await pushNotificationsToAdmin(nowWon, "badge_win", user);
  await pushNotificationsToAdmin(nowLost, "badge_lost", user);
};

const pushNotificationForAward = async (
  user: UserInterface,
  achieved: Achiever[],
) => {
  for (const achievedAward of achieved) {
    const data = await getAwardNotificationData(achievedAward);
    await sendNotification(user.uid, data);
    await updateNotificationUserDB(user.uid, data);
  }
};

const pushNotificationForLostAward = async (
  user: UserInterface,
  lost: Achiever[],
) => {
  for (const lostAward of lost) {
    const data = await getLostAwardNotificationData(lostAward);
    await sendNotification(user.uid, data);
    await updateNotificationUserDB(user.uid, data);
  }
};

const getAwardNotificationData = async (
  achiever: Achiever,
): Promise<NotifeeData> => {
  const award = await getAwardById(achiever.awardId);

  return {
    notificationType: "image",
    navigateTo: "AwardWon",
    navigateToParams: {
      achivementId: achiever.id,
    },
    imageUrl: award?.img?.url,
    title: `Congratulations! Your just unlocked ${award?.name} badge`,
    body: "Your hardwork has paid off! You just unlocked an award. Finish the rest of the badges to achieve your goal.",
    uid: achiever.uid,
    createdOn: Date.now(),
    subtitle: "",
    id: uuid(),
  };
};

const getLostAwardNotificationData = async (
  achiever: Achiever,
): Promise<NotifeeData> => {
  const award = await getAwardById(achiever.awardId);

  const dt = achiever.endTime
    ? `until ${format(new Date(achiever.endTime), "dd MMM yy")}`
    : "sometime";

  return {
    notificationType: "image",
    navigateTo: "AwardWon",
    navigateToParams: {
      achivementId: achiever.id,
    },
    imageUrl: award?.lockedImg?.url,
    title: `Oh no! Your just lost ${award?.name} badge`,
    body: `Don't worry, you have ${dt} to win it back. Get back to your routine & update progress when ready`,
    uid: achiever.uid,
    createdOn: Date.now(),
    subtitle: "",
    id: uuid(),
  };
};

export const pushNotificationsToAdmin = async (
  achievers: Achiever[],
  tempplateId: "badge_win" | "badge_lost",
  user: UserInterface,
) => {
  for (const achiever of achievers) {
    await sendHSMV2(
      toSauravPhone,
      tempplateId,
      [user.name ? user.name : "", achiever.title ? achiever.title : "badge"],
      { "0": [user.uid] },
    );

    await sendHSMV2(
      toJaytiPhone,
      tempplateId,
      [user.name ? user.name : "", achiever.title ? achiever.title : "badge"],
      { "0": [user.uid] },
    );

    await sendHSMV2(
      toSwapnilPhone,
      tempplateId,
      [user.name ? user.name : "", achiever.title ? achiever.title : "badge"],
      { "0": [user.uid] },
    );
  }
};
