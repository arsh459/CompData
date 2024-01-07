import { useRouter } from "next/router";
import {
  EventScheduledEvent,
  InlineWidget,
  useCalendlyEventListener,
} from "react-calendly";
// import { useCalendlySession } from "./hooks/useCalendlySession";
// import { internalMeetingDetails } from "@templates/joinBoatTemplate/V6/utils";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import { useCallback, useState } from "react";
import LoadingModal from "@components/loading/LoadingModal";
import { useAppointment } from "@hooks/appointments/useAppointment";
import {
  failAppointment,
  internalMeetingDetailsV2,
  updateAppointmentStatus,
} from "@templates/joinBoatTemplate/V6/calendlyUtilsV2";
import { setSltoInterventionObj } from "@templates/joinBoatTemplate/ConsultationSlot/utils";
// import { convertUnixToIST } from "@templates/joinBoatTemplate/V6/utils";

interface Props {}

export type CategoryTypes =
  | "gynaecologist"
  | "health_coach"
  | "nutrtitionist"
  | "sales";

export const appCats: CategoryTypes[] = [
  "gynaecologist",
  "health_coach",
  "nutrtitionist",
  "sales",
];

const calendlyURLs: Record<CategoryTypes, string> = {
  gynaecologist: "https://calendly.com/sbdoctorconsultation/call",
  health_coach:
    "https://calendly.com/sbhabitcoach/consultation?hide_landing_page_details=1&hide_gdpr_banner=1",
  nutrtitionist:
    "https://calendly.com/sbdietcall/consultation?hide_landing_page_details=1&hide_gdpr_banner=1",
  sales:
    "https://calendly.com/socialboat/consultation?hide_landing_page_details=1&hide_gdpr_banner=1",
};

const CalendlyTemplateV2: React.FC<Props> = ({}) => {
  const router = useRouter();
  const q = router.query as {
    height?: string;

    appointmentId?: string;
    navBack?: string;
    // calendlyURL?: string;
    appType?: CategoryTypes;
  };

  // console.log(convertUnixToIST(1693294200));

  const heightForCalendly = q.height ? parseInt(q.height) : 896;
  //   const id = q.id;
  const appointmentId = q.appointmentId;
  const appType = q.appType;
  const calendlyURL =
    appType && calendlyURLs[appType]
      ? calendlyURLs[appType]
      : calendlyURLs.sales;

  const navTo = q.navBack
    ? `/start${q.navBack === "1" ? "" : "two"}?section=consultationtime`
    : "";
  //   const { calendlySession } = useCalendlySession(id);

  const { appointment } = useAppointment(appointmentId);

  // const { appointment } = useAppointment(appointmentId);

  // console.log({ appointment });

  // usedoctortimes()

  // console.log("calendly session", calendlySession);

  const [loading, setLoading] = useState<boolean>(false);
  // const [errorMessage, setError] = useState<string>("");

  const successBooking = useCallback(
    async (e: EventScheduledEvent) => {
      weEventTrack("conv_bookSlotV2", { source: "v2" });
      // console.log("hi i am here", calendlySession?.uid, calendlySession?.id);
      // setError(`uid:${calendlySession?.uid} id:${calendlySession?.id}`);

      if (appointment?.id)
        try {
          setLoading(true);

          if (appointment?.patientId) {
            const resp = await internalMeetingDetailsV2(
              e.data.payload.event.uri,
              appointment?.patientId,
              appointment.category ? appointment.category : "sales",
              appointment.id
            );

            // to update appointment object with doctorID, timings

            // console.log("resp", resp);
            if (resp) {
              await updateAppointmentStatus(
                appointment.id,
                appointment.category ? appointment.category : "sales",
                resp
              );
              setSltoInterventionObj("none", appointment?.patientId);
              if (navTo) {
                router.push(navTo);
              } else {
                setLoading(false);
              }
            } else {
              await failAppointment(appointment.id);
              setLoading(false);
            }
          }
        } catch (error) {
          // console.log("error", error);
          // setError(JSON.stringify(error));
          setLoading(false);
          await failAppointment(appointment.id);
        }
    },
    [appointment?.patientId, appointment?.id, navTo]
  );

  useCalendlyEventListener({
    onEventScheduled: successBooking,
  });

  return (
    <div className="h-full">
      {appointment?.id ? (
        <InlineWidget
          utm={{ utmSource: "app" }}
          prefill={{ name: appointment?.name }}
          styles={{ height: `${heightForCalendly}px` }}
          url={calendlyURL}
        />
      ) : null}

      {loading ? (
        <LoadingModal fill="#ff735c" width={40} height={40} fixed={true} />
      ) : null}
    </div>
  );
};

export default CalendlyTemplateV2;
