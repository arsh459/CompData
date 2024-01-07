import { View, Linking } from "react-native";

import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { waBaseLink } from "@constants/links";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { appointmentStatus } from "@modules/DoctorFormMain/utils";
import { useNavigation } from "@react-navigation/native";

export interface Props {
  link?: string;
  status?: appointmentStatus;
}

const AppBottomButtons: React.FC<Props> = ({ link, status }) => {
  const navigation = useNavigation();

  const startCall = () => {
    weEventTrack("medicalProfile_openLink", {});
    if (link) {
      Linking.openURL(link);
    }
  };

  const openWA = () => {
    weEventTrack("medicalProfile_askHelp", {});
    Linking.openURL(
      `${waBaseLink}${encodeURI("Hi!\nI want to connect for appointment")}`
    );
  };

  const reserveNewCall = () => {
    weEventTrack("medicalProfile_reserveCall", {});
    navigation.navigate("MedicalProfileScreen");
  };

  return (
    <View className="mx-4 flex flex-row justify-between">
      <View className="w-1/2 flex-1 pr-2">
        <StartButton
          title={"Contact Us"}
          textColor="text-[#fff] "
          roundedStr="rounded-2xl border border-[0.2px] border-white"
          textStyle="py-2 text-center text-lg"
          onPress={openWA}
          fontFamily="Nunito-Bold"
        />
      </View>
      <View className="w-1/2 flex-1 ">
        {link && status === "SCHEDULED" ? (
          <StartButton
            title={"Join Call"}
            bgColor="bg-[#6D55D1]"
            textColor="text-[#fff] "
            roundedStr="rounded-2xl border-[0.2px] border-[#6D55D1]"
            textStyle="py-2 text-center text-lg "
            onPress={startCall}
            fontFamily="Nunito-Bold"
          />
        ) : (
          <StartButton
            title={"Reschedule"}
            bgColor="bg-[#6D55D1]"
            textColor="text-[#fff] "
            roundedStr="rounded-2xl border-[0.2px] border-[#6D55D1]"
            textStyle="py-2 text-center text-lg "
            onPress={reserveNewCall}
            fontFamily="Nunito-Bold"
          />
        )}
      </View>
    </View>
  );
};

export default AppBottomButtons;
