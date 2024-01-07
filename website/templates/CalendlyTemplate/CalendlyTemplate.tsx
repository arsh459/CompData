import { useRouter } from "next/router";
import {
  EventScheduledEvent,
  InlineWidget,
  useCalendlyEventListener,
} from "react-calendly";
import { useCalendlySession } from "./hooks/useCalendlySession";
import { internalMeetingDetails } from "@templates/joinBoatTemplate/V6/utils";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import { useCallback, useState } from "react";
import LoadingModal from "@components/loading/LoadingModal";
import { updateCalendlySession } from "@models/CalendlySession";
import { useAppointment } from "@hooks/appointments/useAppointment";
import { setSltoInterventionObj } from "@templates/joinBoatTemplate/ConsultationSlot/utils";

interface Props {}

const CalendlyTemplate: React.FC<Props> = ({}) => {
  const router = useRouter();
  const q = router.query as {
    height?: string;
    id?: string;
    appointmentId?: string;
    navBack?: string;
    // calendlyURL?: string;
    // appType?: CategoryTypes;
  };

  const heightForCalendly = q.height ? parseInt(q.height) : 896;
  const id = q.id;
  const appointmentId = q.appointmentId;
  // const calendlyURL = q.appType;
  const navTo = q.navBack
    ? `/start${q.navBack === "1" ? "" : "two"}?section=consultationtime`
    : "";
  const { calendlySession } = useCalendlySession(id);

  const { appointment } = useAppointment(appointmentId);

  // const { appointment } = useAppointment(appointmentId);

  // console.log({ appointment });

  // usedoctortimes()

  // console.log("calendly session", calendlySession);

  const [loading, setLoading] = useState<boolean>(false);
  // const [errorMessage, setError] = useState<string>("");

  const successBooking = useCallback(
    async (e: EventScheduledEvent) => {
      weEventTrack("conv_bookSlotV2", {});
      // console.log("hi i am here", calendlySession?.uid, calendlySession?.id);
      // setError(`uid:${calendlySession?.uid} id:${calendlySession?.id}`);

      if (calendlySession?.uid)
        try {
          setLoading(true);

          if (calendlySession?.uid) {
            const resp = await internalMeetingDetails(
              e.data.payload.event.uri,
              calendlySession?.uid,
              appointment?.id
              // setError
            );

            // to update appointment object with doctorID, timings

            // console.log("resp", resp);
            if (resp) {
              await updateCalendlySession(calendlySession.id, "DONE");
              setSltoInterventionObj("none", calendlySession?.uid);
              if (navTo) {
                router.push(navTo);
              } else {
                setLoading(false);
              }
            } else {
              await updateCalendlySession(calendlySession.id, "FAILED");
              setLoading(false);
            }
          }
        } catch (error) {
          // console.log("error", error);
          // setError(JSON.stringify(error));
          setLoading(false);
          await updateCalendlySession(calendlySession.id, "FAILED");
        }
    },
    [calendlySession?.id, calendlySession?.uid, appointment?.id, navTo]
  );

  useCalendlyEventListener({
    onEventScheduled: successBooking,
  });

  return (
    <div className="h-full">
      {calendlySession ? (
        <InlineWidget
          utm={{ utmSource: "app" }}
          prefill={{ name: calendlySession?.name }}
          styles={{ height: `${heightForCalendly}px` }}
          url={
            appointmentId
              ? "https://calendly.com/socialboat/gynaec-consultation?hide_landing_page_details=1&hide_gdpr_banner=1"
              : // : calendlyURL
                // ? `https://calendly.com/${calendlyURL}/intro-call?hide_landing_page_details=1&hide_gdpr_banner=1`
                `https://calendly.com/socialboat/consultation?hide_landing_page_details=1&hide_gdpr_banner=1`
          }
        />
      ) : null}

      {loading ? (
        <LoadingModal fill="#ff735c" width={40} height={40} fixed={true} />
      ) : null}
    </div>
  );
};

export default CalendlyTemplate;
