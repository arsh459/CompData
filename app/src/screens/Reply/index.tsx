import ReplyMain from "@modules/ReplyMain";
import { useRoute } from "@react-navigation/native";
import { viewLevelsTypes } from "@utils/post/utils";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";

export interface ReplyParams {
  gameId?: string;
  teamId?: string;
  path: string;

  viewLevel: viewLevelsTypes;
  isPushed?: boolean;
}

const Reply = () => {
  const route = useRoute();
  useScreenTrack();
  const params = route.params as ReplyParams;

  return (
    <ReplyMain
      path={params.path}
      gameId={params.gameId}
      teamId={params.teamId}
      viewLevel={params.viewLevel}
    />
  );
};

export default Reply;
