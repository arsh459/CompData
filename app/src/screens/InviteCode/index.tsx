import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import EnterInvteCode from "@modules/Universe/EnterInvteCode";
import { GameProvider } from "@providers/game/GameProvider";
// import { UserProvider } from "@providers/user/UserProvider";
import { useRoute } from "@react-navigation/native";

export interface InviteCodeParams {
  gameId: string;
}

const InviteCode = () => {
  const route = useRoute();
  const params = route.params as InviteCodeParams;

  useScreenTrack();

  return (
    <GameProvider selectedGameId={params.gameId}>
      <>
        <EnterInvteCode />
      </>
    </GameProvider>
  );
};

export default InviteCode;
