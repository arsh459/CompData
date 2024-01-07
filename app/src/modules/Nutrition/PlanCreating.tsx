import { View, Text, Image, TouchableOpacity, Linking } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { waBaseLink } from "@constants/links";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

const PlanCreating = () => {
  const { bottom } = useSafeAreaInsets();
  const openWhatsApp = () => {
    weEventTrack("click_wa", {});
    Linking.openURL(
      `${waBaseLink}${encodeURI("Hi!\nI want to get health consultation")}`
    );
  };

  return (
    <View className="flex-1 flex items-center">
      <Image
        source={{
          uri: "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/Group_1257_EJIrDQRhVA.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677672378005",
        }}
        className="flex-[2] aspect-[183/230] mt-4"
        resizeMode="contain"
      />
      <View className="p-4">
        <Text
          className="text-white text-xl leading-5"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          We have received your details
        </Text>

        <Text
          className="text-xs text-white/80 py-3"
          style={{ fontFamily: "Nunito-Medium" }}
        >
          Your nutritionist will reach out on your consultation time.
        </Text>
      </View>
      <Image
        source={{
          uri: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Mask_group_TiFhUWI6t.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676106587061",
        }}
        style={{ transform: [{ rotateX: "180deg" }, { rotateZ: "30deg" }] }}
        className="flex-[.5] aspect-[0.6] mr-[15%]"
        resizeMode="contain"
      />

      <View
        className="w-full px-4 mt-2"
        style={{ paddingBottom: bottom || 16 }}
      >
        <TouchableOpacity
          onPress={openWhatsApp}
          className="rounded-2xl  bg-[#6D55D1] p-3"
        >
          <Text
            className="text-white text-lg text-center"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            Contact Us
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlanCreating;
