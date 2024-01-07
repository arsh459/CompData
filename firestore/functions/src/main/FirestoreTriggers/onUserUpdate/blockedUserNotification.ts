import { TEAM_ALPHABET_GAME } from "../../../constants/challenge";
import { toSauravPhone } from "../../../constants/email/contacts";
import { sendHSMV3 } from "../../../models/Conversations/sendHSMV2";
import { UserInterface } from "../../../models/User/User";
import { getShareUrl } from "../../../utils/branch/createDeeplink";

export const sendBlockedUserNotification = async (
  userNow: UserInterface,
  userPre: UserInterface,
) => {
  if (
    userNow.blockedPostIds?.length &&
    userNow.blockedPostIds?.length !== userPre.blockedPostIds?.length
  ) {
    const id = userNow.blockedPostIds[userNow.blockedPostIds?.length - 1];
    console.log("BLOCKED POST ID", id);
    const postDeepLink = await getShareUrl("Reply", {
      viewLevel: "session",
      path: `sbEvents/${TEAM_ALPHABET_GAME}/postsV3/${id}`,
    });

    console.log("postDeepLink", postDeepLink);

    await sendHSMV3(
      toSauravPhone,
      "user_report",
      [
        userNow.name ? userNow.name : "user",
        "post",
        postDeepLink ? postDeepLink : "",
      ],
      undefined,
      ["post"],
    );
  }

  if (
    userNow.blockedUIDs?.length &&
    userNow.blockedUIDs?.length !== userPre.blockedPostIds?.length
  ) {
    const uid = userNow.blockedUIDs[userNow.blockedUIDs?.length - 1];
    console.log("BLOCKED USER", uid);
    const userDeepLink = await getShareUrl("User", {
      userId: uid,
    });

    console.log("userDeepLink", userDeepLink);
    await sendHSMV3(
      toSauravPhone,
      "user_report",
      [
        userNow.name ? userNow.name : "user",
        "account",
        userDeepLink ? userDeepLink : "",
      ],
      undefined,
      ["profile"],
    );
  }
};
