import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import CreatePost from "@modules/Community/CreatePost";
import { useRoute } from "@react-navigation/native";

export type WritePostParams = {
  gameId?: string;
  teamId?: string;
  postId?: string;
};

const WritePost = () => {
  const route = useRoute();
  const params = route.params as WritePostParams;

  useScreenTrack();

  return <CreatePost postId={params.postId} />;
};

export default WritePost;
