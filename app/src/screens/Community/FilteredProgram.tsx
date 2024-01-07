import GradientText from "@components/GradientText";
import { iPhoneX } from "@constants/screen";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { postTypes } from "@models/Post/Post";
import FilteredProgram from "@modules/Community/Program/FilteredProgram";
import Header from "@modules/Header";
import { GameProvider } from "@providers/game/GameProvider";
import { GamePostsProvider } from "@providers/gamePosts/GamePostProvider";
import { TeamProvider } from "@providers/team/TeamProvider";
// import { UserProvider } from "@providers/user/UserProvider";
import { useRoute } from "@react-navigation/native";

import { useWindowDimensions } from "react-native";

export interface ProgramScreenParams {
  gameId: string;
  teamId: string;
  postType: postTypes;
}

const ProgramScreen = () => {
  const route = useRoute();
  const params = route.params as ProgramScreenParams;
  const { width } = useWindowDimensions();

  useScreenTrack(`ProgramScreen-${params.postType}`);

  return (
    <GameProvider selectedGameId={params.gameId}>
      <>
        <Header
          back={true}
          titleNode={
            <GradientText
              text={params.postType}
              textStyle={{
                fontSize: width > iPhoneX ? 30 : 24,
                fontFamily: "BaiJamjuree-Bold",
                textTransform: "capitalize",
                fontWeight: "bold",
                color: "white",
              }}
              colors={
                params.postType === "spotlight"
                  ? ["#A3D8FF", "#C1FFBF"]
                  : ["#FE6C8B", "#F49AD9"]
              }
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              fallbackColor="white"
            />
          }
          defaultOption={true}
          headerColor="#100F1A"
          tone="dark"
        />
        <TeamProvider selectedTeamId={params.teamId}>
          <GamePostsProvider postType={params.postType}>
            <FilteredProgram postType={params.postType} />
          </GamePostsProvider>
        </TeamProvider>
      </>
    </GameProvider>
  );
};

export default ProgramScreen;
