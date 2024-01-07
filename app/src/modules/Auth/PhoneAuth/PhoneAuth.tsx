import { Image, Platform, View } from "react-native";
import { usePhoneAuthContext } from "../providers/PhoneAuthProvider";
// import CodeInputV2 from "./CodeInput/CodeInputV2";
import PhoneInputV2 from "./PhoneInput/PhoneInputV2";
import { socialboatSakhiLogoColor2 } from "@constants/imageKitURL";
import Loading from "@components/loading/Loading";
import AuthSelector from "./PhoneInput/AuthSelector";
// import { useAttestStore } from "@hooks/attest/attestStore";
// import { shallow } from "zustand/shallow";
// import { useEffect } from "react";
// import BackNode from "@modules/Header/BackNode";

interface Props {}

const PhoneAuth: React.FC<Props> = ({}) => {
  const { loading, selectedAuthProvider } = usePhoneAuthContext();

  // const {
  //   readyState,
  //   //  setRetry
  // } = useAttestStore((state) => {
  //   return { readyState: state.state, setRetry: state.setRetry };
  // }, shallow);

  // useEffect(() => {
  //   if (readyState === "failed") {
  //     // Alert.alert(
  //     //   "Not Connected to Internet",
  //     //   "Recheck you connection and click try again",
  //     //   [{ text: "Retry", onPress: setRetry }]
  //     // );
  //   }
  // }, [readyState]);

  return (
    <>
      <View className="flex flex-row justify-center items-center">
        <Image
          source={{ uri: socialboatSakhiLogoColor2 }}
          className="w-4/5 max-w-xs aspect-square"
          resizeMode="contain"
        />
      </View>
      {/* <View className="px-4">
        <BackNode
          backIcon="arrow_circle"
          onBack={() => {}}
          tone={"dark"}
          backIconColor={"#fff"}
        />
      </View> */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <Loading width="w-12" height="h-12" />
        </View>
      ) : selectedAuthProvider === "phone" || Platform.OS === "android" ? (
        <PhoneInputV2 />
      ) : (
        <AuthSelector />
      )}

      {/* <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={configObj}
      /> */}
    </>
  );
};

export default PhoneAuth;
