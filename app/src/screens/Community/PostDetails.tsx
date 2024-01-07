import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import PostScreen from "@modules/Community/PostScreen";
import { GameProvider } from "@providers/game/GameProvider";
import { TeamProvider } from "@providers/team/TeamProvider";
// import { UserProvider } from "@providers/user/UserProvider";
import { useRoute } from "@react-navigation/native";

export interface PostDetailsParams {
  gameId: string;
  teamId: string;
  postId: string;
}

const PostDetails = () => {
  const route = useRoute();
  const params = route.params as PostDetailsParams;

  useScreenTrack();

  return (
    <GameProvider selectedGameId={params.gameId}>
      <>
        <TeamProvider selectedTeamId={params.teamId}>
          <PostScreen postId={params.postId} />
        </TeamProvider>
      </>
    </GameProvider>
  );
};

export default PostDetails;
