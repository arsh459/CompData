import { ScrollView } from "react-native";
import DaySlider from "./DaySlider";
import SlotTime from "./SlotTime";
import JoinBoatWrapper from "../JoinBoatWrapper";
import { useNavigation } from "@react-navigation/native";
import { useZohoSlotStore } from "./store/zohoSlotStore";
import { shallow } from "zustand/shallow";
import { useUserStore } from "@providers/user/store/useUserStore";
import { useEffect, useState } from "react";
import { BookZohoSlotProps } from "@screens/BookZohoSlot";
import LoadingModal from "@components/loading/LoadingModal";
import { Alert } from "react-native";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { setSltoInterventionObj } from "@modules/SlotIntervention/utils";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { createFBRequest } from "@utils/analytics/webengage/fb/main";
import { format } from "date-fns";
import { useDeviceStore } from "@providers/device/useDeviceStore";

const ConsultationSlot: React.FC<BookZohoSlotProps> = ({
  category,
  nextScreen,
  nextScreenDoneNav,
}) => {
  const navigation = useNavigation();
  const { todayUnix } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false);

  const uid = useUserStore(({ user }) => user?.uid, shallow);
  const { deviceData } = useDeviceStore(
    (state) => ({ deviceData: state.data }),
    shallow
  );

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
  }, [todayUnix]);

  const handleSaveAndSchedule = async () => {
    weEventTrack("zohoSlotRequest", {});
    setLoading(true);
    if (uid) {
      const appointmentId = await bookSlot(uid, category);
      if (appointmentId) {
        weEventTrack("zohoSlotBooked", {});
        setSltoInterventionObj("none", uid);

        createFBRequest(
          "Schedule",
          uid,
          `${format(new Date(), "yyyy-MM-dd")}`,
          deviceData,
          appointmentId
        );

        resetStore();
        if (nextScreen === "SlotConfirmation") {
          navigation.navigate("SlotConfirmation");
        } else if (nextScreen === "AppointmentBookedScreen") {
          navigation.navigate("AppointmentBookedScreen", {
            appointmentId,
            navTo: nextScreenDoneNav,
          });
        } else {
          navigation.navigate("Home");
        }
      } else {
        weEventTrack("zohoSlotFailed", {});
        Alert.alert("There is some issue with your connection!", "", [
          { text: "Try Again", onPress: () => initStore(todayUnix) },
        ]);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <JoinBoatWrapper
        title="Choose your slot for a FREE Consultation"
        onNext={handleSaveAndSchedule}
        disabled={!uid || !hasSelected}
        nextBtnText="Book Consultation"
      >
        <DaySlider />

        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SlotTime />
        </ScrollView>
      </JoinBoatWrapper>
      {loading ? <LoadingModal width="w-12" height="h-12" /> : null}
    </>
  );
};

export default ConsultationSlot;
