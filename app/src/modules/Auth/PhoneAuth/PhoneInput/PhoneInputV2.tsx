import { usePhoneAuthContext } from "@modules/Auth/providers/PhoneAuthProvider";
// import { CountryPicker } from "react-native-country-codes-picker";

import {
  View,
  Text,
  Platform,
  TouchableOpacity,

  // TextInput,
  // useWindowDimensions,
  // Platform,
  // TouchableOpacity,
} from "react-native";
import BasicCTA from "@components/Buttons/BasicCTA";
// import { AppleButton } from "@invertase/react-native-apple-authentication";
// import { useNavigation } from "@react-navigation/native";
import PhoneInputUI from "./PhoneInputUI";
import Policy from "./Policy";
import CodeInputUI from "../CodeInput/CodeInputUI";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

// import Header from "@modules/Header";
// import BackNode from "@modules/Header/BackNode";
// import { weEventTrack } from "@utils/analytics/webengage/userLog";
// import { useAuthContext } from "@providers/auth/AuthProvider";

const PhoneInputV2 = () => {
  // const navigation = useNavigation();
  // const { width } = useWindowDimensions();
  // const [show, setShow] = useState(false);

  const {
    // onUpdatePhoneNumber,
    phoneNumber,
    onRequestCode,
    showMessage,
    message,
    verificationId,
    setVerificationId,
    verificationCode: value,
    onSignIn,
    setAuthProvider,

    // onAppleButtonPress,
    // countryCode,
  } = usePhoneAuthContext();

  const onSignInSubmit = async () => {
    await onSignIn();
    weEventTrack("auth_clickVerifyCode", {});
  };

  const onBecomeUndet = () => {
    setAuthProvider("undetermined");
    setVerificationId(undefined);
    showMessage({ text: "" });
    weEventTrack("auth_clickAnotherWay", {});
  };

  return (
    <View className="px-6 flex-1 flex ">
      <Text
        style={{ fontFamily: "BaiJamjuree-Bold" }}
        className="text-white font-bold text-center text-2xl iphoneX:text-3xl"
      >
        But first let's Sign up!
      </Text>

      <View className="pt-4">
        <Text
          className="text-white font-normal text-sm iphoneX:text-base text-center"
          style={{ fontFamily: "BaiJamjuree-Light" }}
        >
          {verificationId
            ? "Enter the verification code"
            : "Enter your phone no."}
        </Text>
        {verificationId ? <CodeInputUI /> : <PhoneInputUI />}

        <Text
          className="text-[#FF556C] text-center text-xs iphoneX:text-sm py-1"
          style={{ fontFamily: "BaiJamjuree-Regular" }}
        >
          {message.text}
        </Text>
      </View>

      <View className="w-3/5 min-w-max self-center pt-4">
        {verificationId ? (
          <BasicCTA
            text="Continue"
            onPress={onSignInSubmit}
            disabled={value.length !== 6}
            color="bg-white"
            disableColor="bg-stone-400"
            textColor="text-[#100F1A]"
            roundStr="rounded-full"
            paddingStr="py-2"
          />
        ) : (
          <BasicCTA
            text="Get OTP"
            onPress={onRequestCode}
            disabled={!phoneNumber}
            color="bg-white"
            disableColor="bg-stone-400"
            textColor="text-[#100F1A]"
            roundStr="rounded-full"
            paddingStr="py-2"
          />
        )}

        {Platform.OS === "ios" ? (
          <TouchableOpacity onPress={onBecomeUndet} className="pt-4">
            <Text className="text-white text-base text-center underline">
              Select another way
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {Platform.OS === "ios" ? null : (
        <>
          <View className="flex-1" />
          <Policy />
        </>
      )}
    </View>
  );
};

export default PhoneInputV2;
