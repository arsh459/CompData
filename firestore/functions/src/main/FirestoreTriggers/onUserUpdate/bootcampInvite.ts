import { mixpanel } from "../../../mixpanel/mixpanel";
import { UserInterface } from "../../../models/User/User";
import { handleBootcampInvite } from "../onActivityMain/handleWorkoutFlag";

export const handleBootcampInviteRecersive = async (
  userNow: UserInterface,
  userPrev: UserInterface,
) => {
  if (
    !userNow.waMessageStatus?.bootcamp &&
    userNow.bootcampDetails?.bootcampId
  ) {
    await handleBootcampInvite(userNow.uid);

    // update bootcamp flag
    await mixpanel.people.set(
      userNow.uid,
      { bootcamp: true },
      { $ignore_time: true },
    );
  }

  // bootcamp
  if (
    userNow.bootcampDetails?.bootcampName &&
    userNow.bootcampDetails?.bootcampName !==
      userPrev.bootcampDetails?.bootcampName
  ) {
    await mixpanel.people.set(
      userNow.uid,
      { bootcampName: userNow.bootcampDetails?.bootcampName },
      { $ignore_time: true },
    );
  }
};
