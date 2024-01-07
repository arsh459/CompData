import {
  toRahulPhone,
  toSwapnilPhone,
} from "../../../constants/email/contacts";
import { sendHSMV2 } from "../../../models/Conversations/sendHSMV2";
import {
  getUsersForPlanId,
  getUsersForPlusTrial,
} from "../../../models/User/Methods";
import { UserInterface } from "../../../models/User/User";
import { getAllPROPlusPlans } from "../../Https/export/paidUsers";

export const notificationMessage = async (test?: boolean) => {
  const allSbPlans = await getAllPROPlusPlans();
  const usersToSend: UserInterface[] = [];
  for (const sbPlan of allSbPlans) {
    const userDocs = await getUsersForPlanId(sbPlan.id);

    usersToSend.push(...userDocs);
  }

  const plusTrialUsers = await getUsersForPlusTrial();

  usersToSend.push(...plusTrialUsers);

  console.log("users to send", usersToSend.length);

  const sentUIDS: { [uid: string]: boolean } = {};
  for (const user of usersToSend) {
    if (user.phone && !test && !sentUIDS[user.uid]) {
      try {
        await sendHSMV2(user.phone, "live_class_reminder_v5", [
          user.name ? user.name : "",
          "*7:00am IST*",
        ]);

        sentUIDS[user.uid] = true;

        console.log("MORNING REMINDER SUCCESS", user.name, user.phone);
      } catch (error) {
        console.log("MORNING REMINDER FAILED", user.name, user.phone);
      }
    } else {
      console.log("MORNING REMINDER SENDING FAILED", user.name, user.phone);
    }
  }

  if (test) {
    console.log("sending to rahul");
    await sendHSMV2(toRahulPhone, "live_class_reminder_v5", [
      "Rahul",
      "Yoga",
      "*7:00am IST*",
      "Swati",
    ]);
    console.log("sending to swapnil");
    await sendHSMV2(toSwapnilPhone, "live_class_reminder_v5", [
      "Rahul",
      "Yoga",
      "*7:00am IST*",
      "Swati",
    ]);
  }
};
