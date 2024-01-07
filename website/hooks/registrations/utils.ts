import { Registration } from "@models/Registrations/Registrations";
import { MessageInterface } from "@templates/editEvent/Registrations/Message/DashboardMessage";
// import { sbEventPayment } from "@utils/payments/interface";
// import { sbEventPayment } from "pages/api/payments/utils/interface";

export const convertPayToMessage = (
  registration: Registration
): MessageInterface => {
  // console.log("registration", registration);
  return {
    registrationId: registration.id,
    eventId: registration.eventId,
    eventName: registration.eventName
      ? registration.eventName
      : "Unknown event",
    userName: registration.name ? registration.name : `New User`,
    userEmail: registration.email ? registration.email : "email unavailable",
    userPhone: registration.phone ? registration.phone : "ph unavailable",
    registrationType: registration.registrationType,
    amount: registration.amount,
    currency: registration.currency,
    img: `https://avatars.dicebear.com/api/avataaars/${
      registration.name
        ? registration.name
        : registration.email
        ? registration.email
        : `new-${Math.random() * 1000}`
    }.svg`,
    dateString: new Date(registration.createdOn).toLocaleString(),
    createdUnix: registration.createdOn,
    cohortId: registration.cohortId ? registration.cohortId : "",
  };
};
