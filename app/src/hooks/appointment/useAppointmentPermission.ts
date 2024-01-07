import { oneDayInMS } from "@modules/Nutrition/V2/DaySelector/hooks/useBadgeProgressCalender";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import { useEffect, useState } from "react";
import { useLastDoneAppointment } from "./useLastDoneAppointment";
import { format } from "date-fns";
import { useDoneAppointmentsCountFromUnix } from "./useDoneAppointmentsCountFromUnix";

export type doctorPermission =
  | "ALLOWED"
  | "ALLOWED_AFTER"
  | "CONTACT_US"
  | "USED_ALL"
  | "UNKNOWN";

export const useAppointmentPermission = () => {
  const { state, todayUnix } = useAuthContext();

  const { subStatus, sbplan, res } = useSubscriptionContext();
  const docCount = sbplan?.offerings?.nbDoctorConsultation;

  const { appointmentsCount } = useDoneAppointmentsCountFromUnix(
    res.userSubscription?.lastPaidUnix
  );
  const { appointment } = useLastDoneAppointment();
  const doneTime = appointment?.startSlot;

  const [docStatus, setDocStatus] = useState<doctorPermission>("UNKNOWN");
  const [docStatusText, setDocStatusText] = useState<string>();

  // console.log("subStatus", subStatus, docCount, sbplan?.id);

  useEffect(() => {
    if (subStatus === "PENDING") {
    } else if (subStatus === "EXPIRED") {
      setDocStatus("CONTACT_US");
      setDocStatusText("Your Subscription is expired.");
    } else if (!docCount) {
      setDocStatus("CONTACT_US");
      setDocStatusText("Your plan does not have this.");
    } else if (subStatus === "SUBSCRIBED" && docCount) {
      const diffMS = todayUnix - (doneTime ? doneTime : 0);
      const diffDays = Math.round(diffMS / oneDayInMS);

      if (appointmentsCount !== -1) {
        if (appointmentsCount >= docCount) {
          setDocStatus("USED_ALL");
          setDocStatusText(
            "Doctor consultations in the plan are completed. To book new, contact us."
          );
        } else {
          if (diffDays >= 90) {
            setDocStatus("ALLOWED");
            setDocStatusText(undefined);
          } else {
            const nextMS = (doneTime || 0) + 90 * oneDayInMS;
            setDocStatus("ALLOWED_AFTER");
            setDocStatusText(
              `Next consultation due at ${format(
                nextMS,
                "dd MMM yyyy"
              )}, To book now`
            );
          }
        }
      } else {
        setDocStatus("CONTACT_US");
        setDocStatusText(undefined);
      }
    }
  }, [
    state.uid,
    subStatus,
    docCount,
    todayUnix,
    doneTime,
    doneTime,
    appointmentsCount,
  ]);

  return {
    docStatus,
    docStatusText,
  };
};
