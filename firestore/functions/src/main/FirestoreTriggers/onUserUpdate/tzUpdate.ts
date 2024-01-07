import { UserInterface } from "../../../models/User/User";
import { addTimezone } from "../../../models/timezone/Methods";
import { getTimezone } from "../onActivityUpdateV2/dateBucket";

export const tzUpdate = async (now: UserInterface, pre?: UserInterface) => {
  if (
    now.recommendationConfig?.timezone?.tzString &&
    now.recommendationConfig?.timezone?.tzString !==
      pre?.recommendationConfig?.timezone?.tzString
  ) {
    const nowTz = getTimezone(now);

    await addTimezone(nowTz);
  }
};
