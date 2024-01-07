import { toSwapnil } from "../../../constants/email/contacts";
import { UserInterface } from "../../../models/User/User";
import { onNewSocialBoat } from "../utils/sendgrid";

export const handleSocialBoatSignUp = async (
  prev: UserInterface,
  now: UserInterface,
) => {
  // new socialBoat signup
  if (!prev.socialBoat && now.socialBoat && now.userKey) {
    // to Swapnil
    await onNewSocialBoat(toSwapnil, now.name, now.phone, now.email);
  }
};
