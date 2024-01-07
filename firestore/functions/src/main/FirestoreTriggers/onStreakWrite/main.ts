import { mixpanel } from "../../../mixpanel/mixpanel";
import { StreakDataInterface } from "../../../models/Streak/streakInterface";

export const handleStreakWriteMain = async (
  uid: string,
  now: StreakDataInterface,
  pre?: StreakDataInterface,
) => {
  // new streak
  if (now && !pre && now.streakStatus === "active") {
    await mixpanel.people.set(
      uid,
      {
        lastStreakStarted: new Date(),
        currentStreakLength: now.days || 0,
        streakStatus: "active",
      },
      { $ignore_time: true },
    );
  }
  // streak inc
  else if (now && pre && now.streakStatus === "active") {
    await mixpanel.people.set(
      uid,
      {
        currentStreakLength: now.days,
        streakStatus: "active",
      },
      { $ignore_time: true },
    );
  }
  // streak inactivated
  else if (
    now &&
    pre &&
    now.streakStatus !== "active" &&
    now.streakStatus !== pre.streakStatus
  ) {
    await mixpanel.people.set(
      uid,
      {
        currentStreakLength: now.days,
        lastStreakEnded: new Date(),
        streakStatus: "inactive",
      },
      { $ignore_time: true },
    );
  }
};
