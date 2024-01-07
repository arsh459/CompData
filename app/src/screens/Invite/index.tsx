import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import Header from "@modules/Header";
import TeamInvite from "@modules/TeamInvite";
// import { UserProvider } from "@providers/user/UserProvider";
import { useRoute } from "@react-navigation/native";

export interface InviteScreenProps {
  teamId: string;
  gameId: string;
}

const InviteScreen = () => {
  const route = useRoute();
  const params = route.params as InviteScreenProps;
  useScreenTrack();
  return (
    <>
      <Header
        back={true}
        tone="dark"
        title="Your invitations"
        headerType="transparent"
      />
      <TeamInvite inviteTeamId={params.teamId} gameId={params.gameId} />
    </>
  );
};

export default InviteScreen;
