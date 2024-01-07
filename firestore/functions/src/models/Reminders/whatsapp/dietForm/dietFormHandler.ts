import {
  toJaytiPhone,
  toSauravPhone,
  toSwapnilPhone,
} from "../../../../constants/email/contacts";

import { sendHSMV2 } from "../../../Conversations/sendHSMV2";
import { getUserById } from "../../../User/Methods";

export const dietFormHandler = async (uid: string) => {
  const user = await getUserById(uid);

  if (user) {
    await sendHSMV2(
      toSwapnilPhone,
      "diet_form_filled", // "opt_in_communications",
      [user.name ? user.name : "", user.phone ? user.phone : ""],
      { "0": [user.uid] },
      undefined,
      undefined,
    );

    await sendHSMV2(
      toSauravPhone,
      "diet_form_filled", // "opt_in_communications",
      [user.name ? user.name : "", user.phone ? user.phone : ""],
      { "0": [user.uid] },
      undefined,
      undefined,
    );

    await sendHSMV2(
      toJaytiPhone,
      "diet_form_filled", // "opt_in_communications",
      [user.name ? user.name : "", user.phone ? user.phone : ""],
      { "0": [user.uid] },
      undefined,
      undefined,
    );
  }

  return false;
};
