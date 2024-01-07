import { View, Text, Image, TouchableOpacity } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import GradientText from "@components/GradientText";
interface Props {
  imgUri?: string;
  text?: string;
  btnTxt?: string;
  onGetStarted: () => void;
}
const OnboardingCardRanking: React.FC<Props> = ({
  btnTxt,
  imgUri,
  text,
  onGetStarted,
}) => {
  return (
    <LinearGradient
      colors={["#B0A5FF", "#9F93F1", "#343150"]}
      className="flex flex-row  items-center rounded-2xl "
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    >
      <View className="w-1/2">
        <Image
          className="w-full aspect-[165/170]"
          source={{
            // uri: "https://ik.imagekit.io/socialboat/Frame_1359__1__PKbnz64o6.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676374771662",
            // uri: "https://ik.imagekit.io/socialboat/Frame_1359__2__kPYWuVAaS.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676376245249",
            uri: imgUri,
          }}
          resizeMode="contain"
        />
      </View>
      <View className="w-1/2  flex items-center p-4">
        <Text className="text-white text-sm pb-4  iphoneX:text-base font-bold">
          {text}
        </Text>

        <TouchableOpacity
          onPress={onGetStarted}
          className="rounded-full py-1.5 w-full bg-[#fff]"
        >
          <GradientText
            text={btnTxt || "Create Team"}
            colors={["#5BFFFD", "#7B92FF", "#AD7BFF"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            textStyle={{
              fontFamily: "BaiJamjuree-SemiBold",
              fontSize: 14,
              textAlign: "center",
              padding: 0,
            }}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default OnboardingCardRanking;
