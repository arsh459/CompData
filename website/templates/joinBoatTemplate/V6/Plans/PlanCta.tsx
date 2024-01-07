// import { useCallback, useState } from "react";
import { getTeamName } from "../CoachAttUtils";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import { sectionTypes } from "@hooks/joinBoat/V6/useSection";
import { UserInterface } from "@models/User/User";
import { useCoachAtt } from "@hooks/attribution/useCoachAtt";
// import {
//   EventScheduledEvent,
//   PopupModal,
//   useCalendlyEventListener,
// } from "react-calendly";
// import { internalMeetingDetails } from "../utils";
import { createCalendlySession } from "@models/CalendlySession";
import { useRouter } from "next/router";

interface Props {
  user?: UserInterface;
  gotoSection: (sec: sectionTypes, replace?: boolean) => void;
  setLoading: (val: boolean) => void;
}

const PlanCta: React.FC<Props> = ({ user, gotoSection, setLoading }) => {
  // const [openSlotBooking, setSlotBooking] = useState<boolean>(false);

  // const successBooking = useCallback(
  //   async (e: EventScheduledEvent) => {
  //     weEventTrack("fScanPayment_bookSlot", {});

  //     try {
  //       setLoading(true);

  //       if (user?.uid) {
  //         const resp = await internalMeetingDetails(
  //           e.data.payload.event.uri,
  //           user?.uid
  //         );
  //         if (resp === true) {
  //           gotoSection("slotConfirmation");
  //           setLoading(false);
  //         } else {
  //           setLoading(false);
  //           gotoSection("slotConfirmation");
  //         }
  //       }
  //     } catch (error) {
  //       setLoading(false);
  //       gotoSection("slotConfirmation");
  //     }
  //   },
  //   [gotoSection, setLoading, user?.uid]
  // );

  // useCalendlyEventListener({
  // onEventScheduled: successBooking,
  // });

  const { coachUID } = useCoachAtt();
  const router = useRouter();

  const openCalendly = async () => {
    if (user?.uid) {
      const id = await createCalendlySession(user.uid, user.name);
      router.push(`/calendly?id=${id}&height=800&navBack=1`);
    }

    weEventTrack("fScanPayment_bookSlot", {});
    // setSlotBooking(true);
  };
  // const closeCalendly = () => {
  // weEventTrack("fScanConsultationSlot_cancelRequest", {});
  // setSlotBooking(false);
  // };

  return (
    <>
      {/* <PopupModal
        url="https://calendly.com/socialboat/consultation?hide_landing_page_details=1&hide_gdpr_banner=1"
        open={openSlotBooking}
        onModalClose={closeCalendly}
        rootElement={document.getElementById("root") as HTMLElement}
        utm={{ utmSource: "website" }}
        prefill={{
          name: user?.name ? user.name : "no name",
        }}
      /> */}
      {/* {openSlotBooking ? null : ( */}
      <div className="w-full p-4 sticky -bottom-px z-20 h-20 flex flex-col justify-end">
        <div className="absolute left-0 right-0 bottom-0 -z-10 bg-gradient-to-t from-[#242237] via-[#242237] h-40" />
        <button
          onClick={openCalendly}
          className="rounded-full px-4 py-3 text-white font-nunitoR text-base text-center w-full bg-white/10 border border-white"
        >
          {getTeamName(coachUID)}
        </button>
      </div>
      {/* )} */}
    </>
  );
};

export default PlanCta;
