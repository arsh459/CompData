import CloseBtn from "@components/Buttons/CloseBtn";
import Header from "@modules/Header";
import ManagePCOS from "@modules/SlotIntervention/ManagePCOS";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SkipSlotBookScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();

  const handelCtaPress = () => {
    weEventTrack("SkipSlotBookScreen_bookClick", { source: "sales" });
    weEventTrack("slot_request", { source: "onboardingSkip_25kWomen" });
    navigation.navigate("BookZohoSlot", {
      category: "sales",
      nextScreen: "AppointmentBookedScreen",
      nextScreenDoneNav: "HOME",
    });
  };

  return (
    <View className="flex-1 bg-[#5F46C9] relative z-0">
      <Header
        tone="dark"
        headerType="transparent"
        optionNode={
          <CloseBtn
            onClose={() => navigation.navigate("Home")}
            classStr="w-6 h-6"
            strokeWidth={2}
          />
        }
      />

      <ManagePCOS />

      <View className="absolute left-0 right-0 bottom-0">
        <TouchableOpacity
          onPress={handelCtaPress}
          className="bg-[#C7FF26] p-4 rounded-xl mx-4"
          style={{ marginBottom: bottom || 16 }}
        >
          <Text
            className="text-[#6D55D1] text-base text-center"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            Book a free consultatation
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SkipSlotBookScreen;
