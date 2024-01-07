import { Image, KeyboardAvoidingView, Text, View } from "react-native";
import { socialboatLogoColor2 } from "@constants/imageKitURL";
import BasicCTA from "@components/Buttons/BasicCTA";
import CodeInputUI from "@modules/Auth/PhoneAuth/CodeInput/CodeInputUI";
import PhoneInputUI from "@modules/Auth/PhoneAuth/PhoneInput/PhoneInputUI";
import { usePhoneAuthContext } from "@modules/Auth/providers/PhoneAuthProvider";
import Header from "@modules/Header";

interface Props {
  onAuthSuccess: (phoneNumber?: string) => Promise<void>;
}

const AuthScreen: React.FC<Props> = ({ onAuthSuccess }) => {
  const {
    phoneNumber,
    onRequestCode,
    message,
    verificationId,
    verificationCode: value,
    onSignIn,
  } = usePhoneAuthContext();

  const onSignInSubmit = async () => {
    await onSignIn();
    onAuthSuccess(phoneNumber);
  };

  return (
    <>
      <Header back={true} headerColor="#100F1A" tone="dark" />
      <KeyboardAvoidingView
        behavior={"position"}
        contentContainerStyle={{ flex: 1 }}
        className="bg-[#100F1A] flex-1 p-4"
      >
        <View className="flex justify-center items-center">
          <Image
            source={{ uri: socialboatLogoColor2 }}
            className="w-2/3 max-w-xs aspect-square object-contain"
          />
        </View>

        <View className="mb-10 flex flex-col">
          <Text className="text-lg my-4 font-bair text-center">
            {verificationId
              ? "Verify Code send to +91XXXXXXXXXX"
              : "Sign in to Get Your Results"}
          </Text>

          {verificationId ? <CodeInputUI /> : <PhoneInputUI />}

          <Text
            className="text-[#FF556C] text-center text-xs iphoneX:text-sm py-1"
            style={{ fontFamily: "BaiJamjuree-Regular" }}
          >
            {message.text}
          </Text>
        </View>

        <View className="flex-1" />

        {verificationId ? (
          <BasicCTA
            text="Continue"
            onPress={onSignInSubmit}
            disabled={value.length !== 6}
            color="bg-white"
            disableColor="bg-stone-400"
            textColor="text-[#100F1A]"
            roundStr="rounded-full"
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
          />
        )}
      </KeyboardAvoidingView>
    </>
  );
};

export default AuthScreen;
