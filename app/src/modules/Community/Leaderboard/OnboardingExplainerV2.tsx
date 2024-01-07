import { View, ScrollView } from "react-native";

import GetStarted from "@modules/JoinBoatMainV2/Components/GetStarted";
import { LinearGradient } from "expo-linear-gradient";
import WelcomeJoin from "./WelcomeJoin";
import YouCanWin from "./YouCanWin";
import HowCanWin from "./HowCanWin";
import { useTeamExplainer } from "@modules/JoinBoatMain/hooks/useTeamExplainer";
import { useInteractionContext } from "@providers/InteractionProvider/InteractionProvider";

interface Props {
  goBack?: boolean;
  welcomeHeight?: number;
}

const OnboardingExplainerV2: React.FC<Props> = ({ goBack, welcomeHeight }) => {
  const { onGetStarted } = useTeamExplainer(goBack);
  const { interactionStatus } = useInteractionContext();

  return (
    <View className="flex-1 relative bg-[#14131E]">
      <ScrollView className="flex-1">
        {interactionStatus ? (
          <>
            <WelcomeJoin welcomeHeight={welcomeHeight} />
            <YouCanWin />
            <HowCanWin />
            {interactionStatus ? (
              <LinearGradient
                colors={["#14131E00", "#14131ECC", "#14131E"]}
                className="flex justify-center p-4 opacity-0"
              >
                <GetStarted
                  disabled={true}
                  text={goBack ? "Go to Leaderboard" : "Join Championship"}
                  bgColor="#FDE2A1"
                />
              </LinearGradient>
            ) : null}
          </>
        ) : null}
      </ScrollView>
      {interactionStatus ? (
        <LinearGradient
          colors={["#14131E00", "#14131ECC", "#14131E"]}
          className="absolute left-0 right-0 bottom-0 flex justify-center px-4 pt-12"
        >
          <GetStarted
            onGetStarted={onGetStarted}
            text={goBack ? "Go to Leaderboard" : "Join Championship"}
            bgColor="#FDE2A1"
          />
        </LinearGradient>
      ) : null}
    </View>
  );
};

export default OnboardingExplainerV2;
