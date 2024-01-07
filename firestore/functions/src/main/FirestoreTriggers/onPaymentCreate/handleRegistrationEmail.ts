import { replyToSocialBoatEmail } from "../../../constants/email/contacts";
import { sbEventInterface } from "../../../models/sbEvent/sbEvent";
// import { sbEventPayment } from "../../../models/sbPayment/sbPayment";
import { getUserById } from "../../../models/User/Methods";
import {
  onNewRegistration,
  onNewRegistrationForCreator,
} from "../utils/sendgrid";

export const handleRegistrationEmail = async (
  eventObj: sbEventInterface,
  toEmail: string | undefined | null,
  amount: string,
  currency: string | undefined | null,
  customerPhone: string | undefined | null,
  // payment: sbEventPayment,
) => {
  if (eventObj) {
    const user = await getUserById(eventObj?.ownerUID);
    // console.log("user", user);
    // payment notification
    if (toEmail) {
      await onNewRegistration(
        toEmail,
        undefined,
        eventObj.name,
        amount,
        currency ? currency : "Rs",
        eventObj.joinURL,
        customerPhone ? customerPhone : "Unknown phone",
      );
    }

    // owner email notification
    if (user?.email) {
      await onNewRegistrationForCreator(
        user.email,
        user.name,
        eventObj.name,
        amount,
        currency ? currency : "Rs",
        eventObj.joinURL,
        toEmail ? toEmail : "Unknown email",
        customerPhone ? customerPhone : "Unknown phone",
      );
    }

    // swapnil notification
    await onNewRegistrationForCreator(
      replyToSocialBoatEmail,
      "Swapnil",
      eventObj.name,
      amount,
      currency ? currency : "Rs",
      eventObj.joinURL,
      toEmail ? toEmail : "Unknown email",
      customerPhone ? customerPhone : "Unknown phone",
    );
  }
};
