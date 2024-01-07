import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import CreateTeamEnterName from "@modules/ChampionShipOnBoarding/CreateTeam/CreateTeamEnterName";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { GameProvider } from "@providers/game/GameProvider";
// import { UserProvider } from "@providers/user/UserProvider";
import { View } from "react-native";

const CreateTeamEnterNameScreen = () => {
  const { state } = useAuthContext();
  useScreenTrack();
  return (
    <View className="flex-1 ">
      <GameProvider selectedGameId={state.gameId}>
        <>
          <CreateTeamEnterName />
        </>
      </GameProvider>
    </View>
  );
};

export default CreateTeamEnterNameScreen;
