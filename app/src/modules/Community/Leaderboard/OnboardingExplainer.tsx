import SwipeList from "@modules/ChampionShipOnBoarding/SwipeList";
import { useTeamExplainer } from "@modules/JoinBoatMain/hooks/useTeamExplainer";
import { Image, View } from "react-native";

interface Props {
  goBack?: boolean;
}

const OnboardingExplainer: React.FC<Props> = ({ goBack }) => {
  const { onGetStarted, section } = useTeamExplainer(goBack);
  // welcome
  // explainer
  switch (section) {
    case "welcomeAnimation":
      return (
        <View className="flex-1  bg-[#14131E]">
          <Image
            source={{
              uri: "https://ik.imagekit.io/socialboat/Group_793__1__L8ULrWrOe.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666177452897",
            }}
            className="w-full h-full"
            resizeMode={"contain"}
          />
        </View>
      );
    case "explainer":
      return <SwipeList onGetStarted={onGetStarted} />;
    default:
      return null;
  }
};

export default OnboardingExplainer;
