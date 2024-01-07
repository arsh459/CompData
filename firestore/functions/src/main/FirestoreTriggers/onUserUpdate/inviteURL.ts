import {UserInterface} from '../../../models/User/User';

export const inviteURLToBeUpdated = (
  userNow: UserInterface,
  userPrev: UserInterface,
): boolean => {
  // if influencer's details change
  if (
    // userNow.userType === 'influencer' &&
    (userNow.name && userNow.name !== userPrev.name) ||
    (userNow.tagline && userNow.tagline !== userPrev.tagline) ||
    (userNow.imageURI && userNow.imageURI !== userPrev.imageURI)
  ) {
    return true;
  }

  // if usertype changes
  if (userNow.userType && userNow.userType !== userPrev.userType) {
    return true;
  }

  return false;
};
