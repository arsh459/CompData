import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useAppointmentPermission } from "@hooks/appointment/useAppointmentPermission";
import { useAppointmentCheck } from "@hooks/appointment/useScheduledAppointment";
import { useFormState } from "@providers/nav/useFormState";
import { useNavStore } from "@providers/nav/navStore";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";

type appointmentStripState =
  | "dietDocForm"
  | "none"
  | "docForm"
  | "dietForm"
  | "health"
  | "manage";

const textMessages: Record<appointmentStripState, string> = {
  dietDocForm: "Book your Doctor appointment",
  none: "",
  dietForm: "Book your nutrition appointment",
  health: "Book FREE Health Conultation",
  manage: "Manage your appointments",
  docForm: "Book your Doctor appointment",
};

const AppointmentSection = () => {
  const { docStatus } = useAppointmentPermission();
  useFormState(docStatus);
  const formStatus = useNavStore((state) => state.formStatus);
  const { appointment, fetching } = useAppointmentCheck();
  const { subStatus } = useSubscriptionContext();

  const navigation = useNavigation();

  let textType: appointmentStripState = "none";
  if (fetching || subStatus === "PENDING") {
    textType = "none";
  } else if (appointment) {
    textType = "manage";
  } else if (subStatus === "EXPIRED") {
    textType = "health";
  } else if (subStatus === "SUBSCRIBED") {
    if (formStatus === "DIET_DOC") {
      textType = "dietDocForm";
    } else if (formStatus === "DIET_ONLY") {
      textType = "dietForm";
    } else if (formStatus === "DOC_ONLY") {
      textType = "docForm";
    } else {
      textType = "manage";
    }
  }

  const handleNavigation = () => {
    // navigation.navigate("DietFormInitiatorScreen");

    if (textType === "dietDocForm") {
      weEventTrack("home_scheduleAppointments", {});
      navigation.navigate("DietFormInitiatorScreen");
    } else if (textType === "dietForm") {
      weEventTrack("home_scheduleAppointments", {});
      navigation.navigate("DietFormInitiatorScreen");
    } else if (textType === "docForm") {
      weEventTrack("home_scheduleAppointments", {});
      navigation.navigate("MedicalProfileScreen");
    } else if (textType === "health") {
      weEventTrack("home_getFreeHealthConsulation", {});
      navigation.navigate("FreeHealthConsulation");
    } else if (textType === "manage") {
      weEventTrack("home_clickMyAppointments", {});
      navigation.navigate("AppointmentsScreen", {});
    } else {
    }
  };

  const text = textMessages[textType];

  // if (docStatus === "CONTACT_US" || docStatus === "UNKNOWN") {
  //   return null;
  // }

  if (!text) {
    return null;
  }

  return (
    <>
      <TouchableOpacity
        className="flex flex-row justify-between items-center mx-4 my-2"
        onPress={handleNavigation}
      >
        <Text
          numberOfLines={1}
          className="flex-1 text-sm text-[#232136]"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          {text}
        </Text>
        <View className="w-5 aspect-square bg-black/10 rounded-full p-[5px]">
          <ArrowIcon direction="right" color="#000000" />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default AppointmentSection;
