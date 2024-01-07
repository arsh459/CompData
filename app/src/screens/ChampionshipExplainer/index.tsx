import { View } from "react-native";
// import OnboardingExplainer from "@modules/Community/Leaderboard/OnboardingExplainer";
import OnboardingExplainerV2 from "@modules/Community/Leaderboard/OnboardingExplainerV2";
import { GameProvider, useGameContext } from "@providers/game/GameProvider";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { SprintDetailProvider } from "@providers/SprintDetail/SprintDetailProvider";
import { InteractionProvider } from "@providers/InteractionProvider/InteractionProvider";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";

const ChampionshipExplainerWrapper = () => {
  const { state } = useAuthContext();
  useScreenTrack();
  return (
    <View className="flex-1">
      <GameProvider selectedGameId={state.gameId}>
        <ChampionshipExplainer />
      </GameProvider>
    </View>
  );
};

const ChampionshipExplainer = () => {
  //   const route = useRoute();
  //   const params = route.params as UserParams;

  const { params } = useGameContext();

  return (
    <View className="flex-1">
      {/* <OnboardingExplainer goBack={true} /> */}
      <SprintDetailProvider sprintId={params?.currentSprint?.id}>
        <InteractionProvider>
          <OnboardingExplainerV2 goBack={true} />
        </InteractionProvider>
      </SprintDetailProvider>
    </View>
  );
};

export default ChampionshipExplainerWrapper;
