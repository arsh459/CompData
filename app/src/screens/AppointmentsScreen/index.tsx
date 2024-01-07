// import "react-native-get-random-values";
// import { v4 as uuidv4 } from "uuid";
import { BackHandler, View } from "react-native";
import { useCallback, useState } from "react";
import Header from "@modules/Header";
import ViewSelectorV3 from "@components/ViewSelector/V3";
import PastAppointments from "@modules/Appointments/PastAppointments";
import { useAppointments } from "@hooks/appointment/useAppointments";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import BookNewSlot from "@modules/Appointments/Components/BookNewSlot";

// import { useUserStore } from "@providers/user/store/useUserStore";
// import { shallow } from "zustand/shallow";
// import {
//   AppointmentInterface,
//   storeAppointment,
// } from "@modules/DoctorFormMain/utils";
// import { useCalendlySession } from "@modules/ProScreenMain/hooks/useCalendlySession";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useAppointmentSession } from "@modules/ProScreenMain/hooks/UseAppointmentSession";
import CalendlyWebview from "./CalendlyWebview";

export interface AppointmentsScreenProps {
  initState?: "OPEN" | "DEFAULT";
}

const AppointmentsScreen = () => {
  useScreenTrack();
  const navigation = useNavigation();

  const route = useRoute();
  const params = route.params as AppointmentsScreenProps;

  const [selectedView, setSelectedView] = useState<"Upcoming" | "All">(
    "Upcoming"
  );

  const { appointments, latestAppointments, loading } = useAppointments();

  // const { uid, name } = useUserStore(({ user }) => {
  //   return {
  //     uid: user?.uid,
  //     name: user?.name,
  //   };
  // }, shallow);

  //create appointment
  const onSlotBook = async () => {
    // if (!(uid && name)) {
    //   return;
    // }

    // const obj: AppointmentInterface = {
    //   id: uuidv4(),
    //   chiefComplaints: "Health Consultation",
    //   patientId: uid,
    //   name: name,
    //   createdOn: Date.now(),
    // };
    if (appointment?.id)
      // const result = await storeAppointment(obj);
      navigation.navigate("AppointmentBookedScreen", {
        appointmentId: appointment.id,
        navTo: "AppointmentsScreen",
      });

    // if (result) {
    //   // Do something with the docId
    //   navigation.navigate("AppointmentBookedScreen", {
    //     appointmentId: obj.id,
    //     goBack: true,
    //   });
    // } else {
    //   console.log("Failed to store the document.");
    //   // Handle the failure case
    // }
  };

  const {
    createAppointmentSession,
    appointment,
    calendlyVisible,
    cancelCalendlySession,
  } = useAppointmentSession("", onSlotBook);

  const onNativeBack = useCallback(() => {
    const onBackPress = () => {
      cancelCalendlySession();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, [cancelCalendlySession]);

  useFocusEffect(onNativeBack);

  if (calendlyVisible) {
    return (
      <CalendlyWebview
        id={appointment?.id}
        category={appointment?.category}
        cancelCalendlySession={cancelCalendlySession}
      />
    );
  }

  return (
    <View className="flex-1 bg-[#232136] relative z-0">
      <Header
        tone="dark"
        back={true}
        headerColor="#232136"
        title="Appointments"
        centerTitle={true}
      />
      <ViewSelectorV3
        view1="Upcoming"
        view2="All"
        currView={selectedView}
        onView1={() => setSelectedView("Upcoming")}
        onView2={() => setSelectedView("All")}
        selectedViewHighlightColors={
          selectedView === "Upcoming"
            ? ["#E192F4", "#9D41FF"]
            : ["#51FF8C", "#41DDFF"]
        }
        bgColor="bg-[#343150 pb-6"
      />
      {loading ? null : selectedView === "Upcoming" ? (
        <PastAppointments pastAppointments={latestAppointments} />
      ) : selectedView === "All" ? (
        <PastAppointments pastAppointments={appointments} />
      ) : null}

      <BookNewSlot
        initOpen={params.initState === "OPEN"}
        createCalendlySession={createAppointmentSession}
      />
    </View>
  );
};

export default AppointmentsScreen;
