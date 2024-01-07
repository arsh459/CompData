import { UserInterface } from "../../../models/User/User";
import { mixpanel } from "../../../mixpanel/mixpanel";
import { getSBPlan } from "../../Https/export/paidUsers";

export const mixpanelPaidFlags = async (
  userNow: UserInterface,
  userPrev: UserInterface,
) => {
  let sbPlanName: string = "";
  if (userPrev.sbPlanId !== userNow.sbPlanId && userNow.sbPlanId) {
    const sbPlanAdded = await getSBPlan(userNow.sbPlanId);

    sbPlanName = sbPlanAdded?.name ? sbPlanAdded?.name : "SB Plan";
  }

  // if (userNow.deliverableFlags) {
  await mixpanel.people.set(
    userNow.uid,

    {
      ...(userNow.deliverableFlags
        ? {
            ...userNow.deliverableFlags,
          }
        : {}),
      ...(userNow.testUser ? { testUser: userNow.testUser } : {}),
      ...(sbPlanName ? { planName: sbPlanName } : {}),
      ...(userNow.consultations ? { ...userNow.consultations } : {}),
      ...(userNow.templatesSent ? { ...userNow.templatesSent } : {}),
      ...(userNow.dietFollowupDay
        ? { dietFollowupDay: userNow.dietFollowupDay }
        : {}),
    },
    { $ignore_time: true },
  );
  // }

  // if (userNow.consultations) {
  //   await mixpanel.people.set(
  //     userNow.uid,

  //     {
  //       ...userNow.consultations,
  //     },
  //     { $ignore_time: true },
  //   );
  // }

  // if (userNow.templatesSent) {
  //   await mixpanel.people.set(
  //     userNow.uid,

  //     {
  //       ...userNow.templatesSent,
  //     },
  //     { $ignore_time: true },
  //   );
  // }

  // if (userNow.dietFollowupDay) {
  //   await mixpanel.people.set(
  //     userNow.uid,

  //     {
  //       dietFollowupDay: userNow.dietFollowupDay,
  //     },
  //     { $ignore_time: true },
  //   );
  // }
};
