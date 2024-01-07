import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import Header from "@modules/Header";
import GameInvite from "@modules/Universe/GameInvite";
// import { UserProvider } from "@providers/user/UserProvider";
import { useRoute } from "@react-navigation/native";

export interface GameInviteScreenProps {
  gameId: string;
}

const GameInviteScreen = () => {
  const route = useRoute();
  const params = route.params as GameInviteScreenProps;

  useScreenTrack();

  return (
    <>
      <Header
        back={true}
        tone="dark"
        title="Your invitations"
        headerColor="#100F1A"
      />
      <GameInvite gameId={params.gameId} />
    </>
  );
};

export default GameInviteScreen;
