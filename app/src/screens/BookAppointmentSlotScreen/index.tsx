import { View, Text } from "react-native";
import { useState } from "react";
import Header from "@modules/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import ImageWithURL from "@components/ImageWithURL";
import { doctorImage } from "@constants/imageKitURL";
// import { useCalendlySession } from "@modules/ProScreenMain/hooks/useCalendlySession";
// import WebView from "react-native-webview";
// import "react-native-get-random-values";
// import { v4 as uuidv4 } from "uuid";
// import {
//   AppointmentInterface,
//   storeAppointment,
// } from "@modules/DoctorFormMain/utils";
import ClickButton from "@modules/JoinBoatMainV3/components/ClickButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { useAppointmentSession } from "@modules/ProScreenMain/hooks/UseAppointmentSession";
import CalendlyWebview from "@screens/AppointmentsScreen/CalendlyWebview";
import { CategoryTypes } from "@modules/Appointments/constants";

export interface BookRequestProps {
  category: CategoryTypes;
}

const BookAppointmentSlotScreen = () => {
  const route = useRoute();
  const params = route.params as BookRequestProps;

  const navigation = useNavigation();
  useScreenTrack();

  const { chiefComplain } = useUserStore(({ user }) => {
    return {
      // uid: user?.uid,
      // name: user?.name,
      chiefComplain: user?.doctorForm?.chiefComplain,
    };
  }, shallow);

  const { bottom } = useSafeAreaInsets();
  // const { height } = useWindowDimensions();

  const [heightHeader, setHeightHeader] = useState(0);
  // const [appId, setAppId] = useState("");

  const onAppointmentSuccess = () => {
    if (appointment)
      navigation.navigate("AppointmentBookedScreen", {
        appointmentId: appointment?.id,
        navTo: "HOME",
      });
    weEventTrack("medicalProfile_appointmentBook", {});
  };

  const {
    createAppointmentSession,
    appointment,
    calendlyVisible,
    cancelCalendlySession,
  } = useAppointmentSession(
    chiefComplain ? chiefComplain : "",
    onAppointmentSuccess
  );

  //create appointment
  // const saveAppointment = async () => {
  //   if (!(chiefComplain && uid && name)) {
  //     return;
  //   }

  //   const obj: AppointmentInterface = {
  //     id: uuidv4(),
  //     chiefComplaints: chiefComplain,
  //     patientId: uid,
  //     name: name,
  //     createdOn: Date.now(),
  //   };

  //   const result = await storeAppointment(obj);

  //   if (result) {
  //     setAppId(result);
  //     // Do something with the docId
  //     createCalendlySession("gynaecologist");
  //   } else {
  //     console.log("Failed to store the document.");
  //     // Handle the failure case
  //   }
  // };

  //take appointmentId and feed to
  if (calendlyVisible) {
    return (
      <CalendlyWebview
        id={appointment?.id}
        category={appointment?.category}
        cancelCalendlySession={cancelCalendlySession}
      />
    );
    // return (
    //   <View className="flex-1 bg-[#232136]w-full h-full">
    //     <Header
    //       back={true}
    //       headerColor="#232136"
    //       tone="dark"
    //       onBack={cancelCalendlySession}
    //     />

    //     <View className="flex-1 w-full h-full">
    //       {calendlySessionId ? (
    //         <WebView
    //           startInLoadingState={true}
    //           originWhitelist={["*"]}
    //           source={{
    //             uri: `https://socialboat.live/calendly?id=${calendlySessionId}&height=${height}&appointmentId=${appId}`,
    //           }}
    //         />
    //       ) : null}
    //     </View>
    //   </View>
    // );
  }

  return (
    <View className="flex-1 bg-[#232136] relative z-0">
      <Header
        tone="dark"
        back={true}
        headerColor="#232136"
        setHeaderHeight={setHeightHeader}
        headerType="transparent"
      />
      <View className="flex-1 " style={{ paddingTop: heightHeader }}></View>
      <View style={{ paddingBottom: bottom || 16 }} className="p-4">
        <ClickButton
          nextBtnText={"Book my slot"}
          onNext={() => createAppointmentSession(params.category)}
        />
      </View>
      <View className="flex-1 absolute left-0 right-0  -z-20">
        <ImageWithURL
          source={{ uri: doctorImage }}
          className=" w-full aspect-[513/567]"
          resizeMode="cover"
        />
        <Text
          className="text-[#F1F1F1] text-xl iphoneX:text-3xl px-4 pt-8"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          💜 Thank you for your information.
        </Text>
        <Text
          className="text-white/70 text-sm iphoneX:text-base pt-4  flex-1 px-4 pb-2"
          style={{ fontFamily: "Nunito-Light" }}
        >
          Click below to set the time for your consultation. Please be strictly
          present at the slot. Rescheduling will be basis availability only.
        </Text>
      </View>
    </View>
  );
};

export default BookAppointmentSlotScreen;
