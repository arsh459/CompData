import GradientText from "@components/GradientText";
import ImageWithURL from "@components/ImageWithURL";
import { socialboatSakhiLogoColor2 } from "@constants/imageKitURL";
import { iPhoneX } from "@constants/screen";
import { View, Text, useWindowDimensions } from "react-native";
import JoinBoatWrapper from "./JoinBoatWrapper";
// import { useAuthContext } from "@providers/auth/AuthProvider";

interface Props {
  onWelcomeNext: () => void;
}

const Welcome: React.FC<Props> = ({ onWelcomeNext }) => {
  const { width } = useWindowDimensions();
  const gradientText = "Welcome to SocialBoat!";
  // console.log("RenderTest Welcome");

  // const { signOut } = useAuthContext();

  return (
    <JoinBoatWrapper
      noBack={true}
      onNext={onWelcomeNext}
      // onNext={signOut}
      nextBtnText="Get Started"
    >
      <View className="flex-1">
        <View className="flex flex-row justify-center items-center">
          <ImageWithURL
            source={{
              uri: socialboatSakhiLogoColor2,
            }}
            className="w-2/3 max-w-xs mx-auto  aspect-square"
            resizeMode="contain"
          />
        </View>
        <View className="w-max mx-auto p-4">
          <GradientText
            text={gradientText}
            textStyle={{
              fontSize: width > iPhoneX ? 36 : 24,
              fontFamily: "BaiJamjuree-Bold",
              textAlign: "center",
              fontWeight: "900",
              color: "white",
            }}
            colors={["#75E0DF", "#7B8DE3"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            fallbackColor="white"
          />
        </View>
        <Text className="w-5/6 mx-auto text-base text-[#CECCDE] text-center">
          Help us understand your goal.
        </Text>
        <Text className="w-5/6 mx-auto text-base text-[#CECCDE] text-center">
          Will take {"< 1"} min
        </Text>
      </View>
    </JoinBoatWrapper>
  );
};

export default Welcome;
