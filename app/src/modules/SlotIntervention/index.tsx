import { slotInterventionTypes } from "@models/User/User";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@modules/Header";
import { useUserStore } from "@providers/user/store/useUserStore";
import { getNextSlotInterventionTypes, setSltoInterventionObj } from "./utils";
import ManagePCOS from "./ManagePCOS";
import LooseWeight from "./LooseWeight";
import PearsnolTeam from "./PearsnolTeam";
import { useNavigation } from "@react-navigation/native";
import { postAppointmentNavigation } from "@screens/BookZohoSlot";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

export interface Props {
  type: slotInterventionTypes;
  onBack: () => void;
  nextScreenNav: postAppointmentNavigation;
}

const SlotIntervention: React.FC<Props> = ({ type, onBack, nextScreenNav }) => {
  const navigation = useNavigation();
  const { bottom } = useSafeAreaInsets();
  const userId = useUserStore(({ user }) => user?.uid);

  const onBackPress = () => {
    setSltoInterventionObj(getNextSlotInterventionTypes(type), userId);
    onBack();
  };

  const handelCtaPress = () => {
    onBackPress();
    weEventTrack("slot_request", { source: type });
    setTimeout(() => {
      navigation.navigate("BookZohoSlot", {
        category: "sales",
        nextScreen: "AppointmentBookedScreen",
        nextScreenDoneNav: nextScreenNav,
      });
    }, 250);
  };

  return (
    <View
      className="bg-[#5F46C9] absolute left-0 right-0 top-0 bottom-0"
      style={{ paddingBottom: bottom || 16 }}
    >
      <Header
        tone="dark"
        headerType="transparent"
        back={true}
        onBack={onBackPress}
      />

      {type === "managePCOS" ? (
        <ManagePCOS />
      ) : type === "looseWeight" ? (
        <LooseWeight />
      ) : type === "pearsnolTeam" ? (
        <PearsnolTeam />
      ) : (
        <View className="flex-1" />
      )}

      <TouchableOpacity
        onPress={handelCtaPress}
        className="bg-[#C7FF26] p-4 rounded-xl mx-4"
      >
        <Text
          className="text-[#6D55D1] text-base text-center"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          Book a free consultatation
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SlotIntervention;
