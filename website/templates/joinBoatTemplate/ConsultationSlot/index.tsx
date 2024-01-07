import DaySlider from "./DaySlider";
import SlotTime from "./SlotTime";
import { useZohoSlotStore } from "./store/zohoSlotStore";
import { useEffect, useState } from "react";
import LoadingModal from "@components/loading/LoadingModal";
import { CategoryTypes } from "@templates/CalendlyTemplate/CalendlyTemplateV2";
import { useRouter } from "next/router";
import { useTodayDate } from "@hooks/myProgram/useTodayDate";
import { setSltoInterventionObj } from "./utils";
import JoinBoatWrapper from "../V6/JoinBoatWrapper";
import { shallow } from "zustand/shallow";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import { createFBRequest } from "@analytics/webengage/fb/main";
import { format } from "date-fns";
import { useDeviceStore } from "@analytics/webengage/fb/store";
import { useDeviceStoreDateInit } from "@analytics/webengage/fb/hooks/useDeviceStoreInit";

export interface Props {
  uid?: string;
}

const ConsultationSlot: React.FC<Props> = ({ uid }) => {
  const router = useRouter();
  const q = router.query as {
    navBack?: string;
    appType?: CategoryTypes;
  };

  const category = q.appType || "sales";
  // const navTo = `/start${
  //   q.navBack === "1" ? "" : "two"
  // }?section=consultationtime`;
  const { todayUnix } = useTodayDate();
  const [loading, setLoading] = useState<boolean>(false);

  const { hasSelected, bookSlot, initStore, resetStore } = useZohoSlotStore(
    (state) => ({
      hasSelected: !!state.slot,
      bookSlot: state.bookSlot,
      initStore: state.initStore,
      resetStore: state.resetStore,
    }),
    shallow
  );

  useEffect(() => {
    initStore(todayUnix);

    return () => {
      resetStore();
    };
  }, [todayUnix, initStore, resetStore]);

  useDeviceStoreDateInit();
  const { deviceData } = useDeviceStore(
    (state) => ({ deviceData: state.data }),
    shallow
  );

  const handleSaveAndSchedule = async () => {
    setLoading(true);
    weEventTrack("zohoSlotRequest", {});
    if (uid) {
      const appointmentId = await bookSlot(uid, category);
      if (appointmentId) {
        weEventTrack("zohoSlotBooked", {});
        setSltoInterventionObj("none", uid);
        resetStore();

        // schedule
        createFBRequest(
          "Schedule",
          uid,
          `${format(new Date(), "yyyy-MM-dd")}`,
          deviceData,
          appointmentId
        );

        // router.push(navTo);
        router.push(
          `/start${q.navBack === "1" ? "" : "two"}?section=consultationtime`
        );
      } else {
        weEventTrack("zohoSlotFailed", {});
        window.alert("There is some issue with your connection!");
      }
    }
    setLoading(false);
  };

  return (
    <>
      <JoinBoatWrapper
        title="Choose your slot for a FREE Consultation"
        onNext={handleSaveAndSchedule}
        nextBtnText="Book Consultation"
        disabled={!uid || !hasSelected}
      >
        <div className="w-full h-full relative z-0">
          <div className="absolute inset-0 flex flex-col z-0">
            <DaySlider />

            <SlotTime />
          </div>
        </div>
      </JoinBoatWrapper>
      {loading ? <LoadingModal width={48} height={48} fill="#ff735c" /> : null}
    </>
  );
};

export default ConsultationSlot;
