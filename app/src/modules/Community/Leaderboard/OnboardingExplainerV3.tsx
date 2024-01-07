import { View } from "react-native";

import GradientText from "@components/GradientText";

interface Props {
  goBack?: boolean;
  welcomeHeight?: number;
}
export interface JoinFitnessOnboardingCarousalData {
  imgUri?: string;
  text?: string;
  btnTxt?: string;
}
export const joinFitnessOnboardingCarousalData: JoinFitnessOnboardingCarousalData[] =
  [
    {
      btnTxt: "Create a team",
      text: "Workout with Friends",
      imgUri:
        "https://ik.imagekit.io/socialboat/chamexercise_4qA5h8mtw.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676374771668",
    },
    {
      btnTxt: "Earn Now!",
      text: "Earn Badges to your collection",
      imgUri:
        "https://ik.imagekit.io/socialboat/Frame_1359__1__PKbnz64o6.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676374771662",
    },
    {
      btnTxt: "Transform Now!",
      text: "Transform yourself with friends",
      imgUri:
        "https://ik.imagekit.io/socialboat/bfafter_EbtKhQOHG.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676374771633",
    },
  ];
const OnboardingExplainerV3: React.FC<Props> = ({ goBack }) => {
  return (
    <View className="flex-1 relative bg-[#14131E]">
      <View className="flex-1 mt-10">
        <GradientText
          text={"Join the Fitness Challenge"}
          colors={["#AD7BFF", "#7B92FF", "#5BFFFD"]}
          end={{ x: 0, y: 1 }}
          start={{ x: 1, y: 0 }}
          textStyle={{
            fontFamily: "BaiJamjuree-SemiBold",
            fontSize: 24,
            textAlign: "left",
            paddingLeft: 16,
          }}
        />
      </View>
    </View>
  );
};

export default OnboardingExplainerV3;
