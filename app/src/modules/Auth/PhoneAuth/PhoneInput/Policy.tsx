// import { usePhoneAuthContext } from "@modules/Auth/providers/PhoneAuthProvider";
// import { CountryPicker } from "react-native-country-codes-picker";

import {
  View,
  Text,
  //   TextInput,
  //   useWindowDimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
// import { useState } from "react";
// import BasicCTA from "@components/Buttons/BasicCTA";
// import { AppleButton } from "@invertase/react-native-apple-authentication";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

// import { weEventTrack } from "@utils/analytics/webengage/userLog";
// import { useAuthContext } from "@providers/auth/AuthProvider";

const Policy = () => {
  const navigation = useNavigation();

  const onClickPolicy = () => {
    navigation.navigate("WebViewScreen", {
      source:
        "https://socialboat.notion.site/Privacy-Policy-68079970e2d64d95bddf92bb31114ad8",
    });

    weEventTrack("auth_clickPrivacyPolicy", {});
  };
  const onClickTerms = () => {
    navigation.navigate("WebViewScreen", {
      source:
        Platform.OS === "ios"
          ? "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
          : "https://socialboat.notion.site/Terms-of-Use-dac5e29234f542b48e826ed54c10f8fe",
    });

    weEventTrack("auth_clickTerms", {});
  };

  return (
    <>
      <Text
        style={{ fontFamily: "BaiJamjuree-Regular" }}
        className="text-white  text-xs  text-center"
      >
        By Continuing you agree to our Privacy policy and Terms of use
      </Text>

      <View className="flex flex-row justify-center pt-4">
        <TouchableOpacity onPress={onClickPolicy}>
          <Text
            className="text-white underline text-xs"
            style={{ fontFamily: "BaiJamjuree-Regular" }}
          >
            Privacy Policy
          </Text>
        </TouchableOpacity>
        <View className="w-8" />
        <TouchableOpacity onPress={onClickTerms}>
          <Text
            className="text-white underline text-xs"
            style={{ fontFamily: "BaiJamjuree-Regular" }}
          >
            Terms of use
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Policy;
