import { reviewStatus, reviewTicketStatus } from "@models/Activities/Activity";
import { statusTypes } from "./ProgressBar";

export const getStepText = (
  reviewStatus?: reviewStatus
): { text: string; color: statusTypes } => {
  if (reviewStatus === "DISCARDED") {
    return { text: "Rejected", color: "pending" };
  } else if (reviewStatus === "NEED_MORE_DATA") {
    return { text: "Need info", color: "pending" };
  } else if (reviewStatus === "TRY_AGAIN") {
    return { text: "Try again", color: "pending" };
  } else if (reviewStatus === "REVIEWED" || reviewStatus === "SAVED") {
    return { text: "Reviewed", color: "done" };
  }

  return { text: "Reviewed", color: "done" };
};

export const getLeftButton = (
  reviewStatus?: reviewStatus,
  ticketStatus?: reviewTicketStatus,
  tryAgainURL?: string,
  isMyActivity?: boolean
) => {
  if (
    isMyActivity &&
    ticketStatus === "REVIEWED" &&
    reviewStatus === "TRY_AGAIN"
  ) {
    return {
      text: "Try Task Again",
      link: tryAgainURL ? tryAgainURL : "",
    };
  } else if (
    isMyActivity &&
    ticketStatus === "REVIEWED" &&
    reviewStatus === "NEED_MORE_DATA"
  ) {
    return {
      text: "Edit Task",
      link: tryAgainURL ? tryAgainURL : "",
    };
  }

  return {
    text: "Chat with Support",
    link: "https://api.whatsapp.com/send?phone=919958730020&text=Hi!",
  };
};
