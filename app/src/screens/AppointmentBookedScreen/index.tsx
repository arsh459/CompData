import { View, Text, Linking } from "react-native";
import { useState } from "react";
import Header from "@modules/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import ImageWithURL from "@components/ImageWithURL";
import { BookedIcon, goldFeatherLeftIcon } from "@constants/imageKitURL";
import { useAppointment } from "@hooks/appointment/useAppointment";
import MediaTile from "@components/MediaCard/MediaTile";
import { ScrollView } from "react-native-gesture-handler";
import { waBaseLink } from "@constants/links";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import HelpButton from "@modules/ProScreenMain/HelpButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { handleSlotStrings } from "./utils";
import clsx from "clsx";
import { useAppointmentPermission } from "@hooks/appointment/useAppointmentPermission";
import { useUserV3 } from "@hooks/auth/useUserV3";
import { postAppointmentNavigation } from "@screens/BookZohoSlot";

export interface AppointmentBookedScreenProps {
  appointmentId: string;
  navTo: postAppointmentNavigation;
}

export const appointmentSubtext = `You will get the Video Conference link on the email you shared. In case you want to reschedule, please reach out to us. Please be present at the alloted time. Rescheduling the appointment is basis doctor avilability.`;
export const nonGynaecAppointmentSubtext =
  "Our expert will reach out to you on phone call. In case you would like to reschedule or prefer a Video conference, please reach out to us on WhatsApp and we will make the required changes.";

export const appointmentCancelledText = `Please note that as part of your plan, you get one consultation in 3 months. All additional consultations will be charged at INR 700.

Rescheduling of the consultation can be done basis doctor's availability. 
`;

export const appointmentDone = `We hope your consultation experience was good. If you have any questions, you can reach out to us.

The doctor will take a few hours to share the prescription with you. Once it's ready, you can view it below.

Your health coach will reach out to you for the next steps of your plan
`;

const AppointmentBookedScreen = () => {
  useScreenTrack();

  const route = useRoute();
  const { bottom } = useSafeAreaInsets();

  const { appointmentId, navTo } = route.params as AppointmentBookedScreenProps;

  const navigation = useNavigation();
  const [height, setHeight] = useState(0);
  const { appointment } = useAppointment(appointmentId);
  const { user: doctor } = useUserV3(appointment?.doctorId);

  const { docStatus } = useAppointmentPermission();

  const { mainText, primaryText, primaryButton, primaryAction } =
    handleSlotStrings(appointment, docStatus, navTo);

  const onPrimaryButtonClick = () => {
    switch (primaryAction) {
      case "CONTACT_US":
        openWA();
        return;

      case "DOWNLOAD":
        weEventTrack("medicalProfile_downloadPrescription", {});
        return;

      case "BACK":
        navigation.goBack();
        return;

      case "AppointmentsScreen":
        navigation.navigate("AppointmentsScreen", {});
        return;

      case "HOME":
        goToHome();
        return;

      case "JOIN_LINK":
        weEventTrack("medicalProfile_openLink", {});
        if (appointment?.link) {
          Linking.openURL(appointment?.link);
        }
        return;

      case "RESCHEDULE":
        weEventTrack("medicalProfile_reserveCall", {});
        navigation.navigate("MedicalProfileScreen");
        return;

      case "NONE":
        return;
    }
  };

  const openWA = () => {
    weEventTrack("medicalProfile_askHelp", {});
    Linking.openURL(
      `${waBaseLink}${encodeURI("Hi!\nI want to connect for appointment")}`
    );
  };

  const goToHome = () => {
    weEventTrack("medicalProfile_markDone", {});
    navigation.navigate("Home");
  };

  return (
    <View className="flex-1 bg-[#232136] ">
      <Header
        tone="dark"
        back={true}
        headerColor="#232136"
        setHeaderHeight={setHeight}
        headerType="transparent"
        optionNode={<HelpButton onPress={openWA} text="Ask For Help" />}
      />
      <ScrollView bounces={false} className="flex-1">
        <View className="w-full relative z-0">
          <ImageWithURL
            source={{ uri: BookedIcon }}
            className="w-full aspect-[375/217] "
          />

          <View className="absolute left-0 right-0 bottom-0">
            <View
              className="w-1/2 mx-auto aspect-[170/230]"
              style={{ paddingTop: height }}
            >
              <MediaTile media={doctor?.landingContent?.img} fluid={true} />
            </View>
          </View>
        </View>
        <View className="p-4">
          <Text
            className="text-[#F1F1F1] text-xl"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {mainText}
            <Text
              className={clsx(
                appointment?.status === "CANCELLED"
                  ? "text-[#FF5190]"
                  : "text-[#51FF8C]",
                "text-xl"
              )}
              style={{ fontFamily: "Nunito-Bold" }}
            >
              {" "}
              {primaryText}
            </Text>
          </Text>
        </View>
        <View className="bg-[#343150] rounded-2xl p-4 mx-4">
          <Text
            className="text-[#F1F1F1] text-xl"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {doctor?.name}
          </Text>
          <Text
            className="text-[#FF7DE2] text-xs "
            style={{ fontFamily: "Nunito-SemiBold" }}
          >
            {doctor?.landingContent?.qualification}
          </Text>
          <Text
            className="text-white/50 text-xs py-4"
            style={{ fontFamily: "Nunito-SemiBold" }}
          >
            {doctor?.bio}
          </Text>
          <View className="h-px w-full bg-[#D8D8D826] " />
          {doctor?.landingContent?.experienceYears &&
          doctor?.landingContent?.experienceYears > 0 ? (
            <View className="flex flex-row items-center pt-4 justify-center">
              <ImageWithURL
                source={{ uri: goldFeatherLeftIcon }}
                className="w-4 aspect-[12/30]"
              />
              <Text className="text-[#D59826] text-base px-2 font-sans font-normal">
                {doctor?.landingContent?.experienceYears
                  ? `${doctor?.landingContent?.experienceYears} years of experience`
                  : ""}
              </Text>
              <ImageWithURL
                source={{ uri: goldFeatherLeftIcon }}
                style={{ transform: [{ scaleX: -1 }] }}
                className="w-4 aspect-[12/30]"
              />
            </View>
          ) : null}
        </View>
        <Text
          className="text-white/50 text-xs  p-4 pt-10"
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          {appointment?.status === "SCHEDULED"
            ? appointmentSubtext
            : appointment?.status === "DONE"
            ? appointmentDone
            : appointmentCancelledText}
        </Text>
      </ScrollView>
      <View
        style={{ paddingBottom: bottom || 16 }}
        className="px-4 flex flex-col w-full justify-between "
      >
        {/* {appointment?.status === "SCHEDULED" ? (
          <View className="flex-1 pb-2">
            <StartButton
              title={"Done"}
              textColor="text-[#fff] "
              roundedStr="rounded-2xl border border-[0.2px] border-white"
              textStyle="py-2 text-center text-lg"
              onPress={goToHome}
              fontFamily="Nunito-Bold"
            />
          </View>
        ) : null} */}
        <View className="flex-1">
          {primaryAction !== "NONE" ? (
            <StartButton
              title={primaryButton}
              bgColor="bg-[#6D55D1]"
              textColor="text-[#fff] "
              roundedStr="rounded-2xl border-[0.2px] border-[#6D55D1]"
              textStyle="py-3 text-center text-lg "
              onPress={onPrimaryButtonClick}
              fontFamily="Nunito-Bold"
            />
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default AppointmentBookedScreen;

/**
 * SCHEDULED - Done | Start Consultation
 * DONE - NA / Start Consultation
 * CANCELLED - NA / Re Schedule
 *
 */
