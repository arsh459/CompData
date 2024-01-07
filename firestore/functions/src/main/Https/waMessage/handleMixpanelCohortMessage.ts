import { variableNames } from ".";
import { RahulUID } from "../../../constants/email/contacts";
import { sendHSMV2 } from "../../../models/Conversations/sendHSMV2";
import { getUserById } from "../../../models/User/Methods";
import { sleep } from "../../FirestoreTriggers/onLiveWorkoutUpdate/handleLiveUpdate";
import {
  addMixpanelTemplateProperty,
  trackMarketingNotificationRequested,
} from "../../FirestoreTriggers/onUserUpdate/updateFPConv";
import { getCallbackData } from "../../PubSub/notifications/handleSend";
import { MixpanelMemberFirstore } from "../mixpanel/interface";
import { blockedUsers } from "./sendUtils";

export const handleMixpanelCohortMessage = async (
  cohortId: string,
  membersUnsorted: MixpanelMemberFirstore[],
  // startIndx: number,
  test: boolean,
  templateId: string,
  image: string | undefined,
  start: number,
  end: number,
  variables?: variableNames[],
) => {
  let i: number = 0;
  const sentMap: { [phone: string]: boolean } = {};

  // sort members
  const members = membersUnsorted.sort((a, b) => {
    var textA = a.phone ? a.phone.toUpperCase() : "z";
    var textB = b.phone ? b.phone.toUpperCase() : "z";

    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });

  console.log("members", members.length);

  for (const member of members) {
    // increment i
    i++;

    if (i >= start && i < end && member.user_id) {
      const user = await getUserById(member.user_id);

      if (user?.phone) {
        if (blockedUsers.includes(user.phone)) {
          console.log("Skipping from Blocked LIST", user.phone, i);
        } else if (user.unsubscribe) {
          console.log("unsubscribed user", user.phone);
        } else if (sentMap[user.phone]) {
          console.log("Skipping Sent User", user.phone, i);
        } else {
          sentMap[user.phone] = true;

          if (test) {
            await sendHSMV2(
              "+919538404044",
              templateId,
              [user.name ? user.name : "there"],
              undefined,
              image ? [image] : undefined,
            );
            console.log("SENT TO SWAPNIL");
            await sendHSMV2(
              "+919811800046",
              templateId,
              [user.name ? user.name : "there"],
              undefined,
              image ? [image] : undefined,
            );
            console.log("SENT TO RAHUL");

            // increment property
            await addMixpanelTemplateProperty(templateId, RahulUID);

            throw new Error("TESTING");
          } else {
            const isError = await sendHSMV2(
              user.phone,
              templateId,
              [user.name ? user.name : "there"],
              undefined,
              image ? [image] : undefined,
              JSON.stringify(
                getCallbackData(
                  member.mixpanel_distinct_id,
                  templateId,
                  cohortId,
                ),
              ),
            );
            console.log(
              i,
              " | ",
              user.name,
              " | ",
              user.gender,
              " | ",
              user.uid,
              " | ",
              user.phone,
              " | ",
              user.fpCredit ? user.fpCredit : 0,
            );
            await sleep(1000);

            // increment property
            await addMixpanelTemplateProperty(
              templateId,
              member.mixpanel_distinct_id,
            );

            // notification send request
            await trackMarketingNotificationRequested(
              member.mixpanel_distinct_id,
              templateId,
              cohortId,
            );

            if (isError === "ERROR") {
              throw new Error("ERROR encountered");
            }
          }
        }
      }
    }
  }
};
