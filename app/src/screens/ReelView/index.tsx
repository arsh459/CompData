import Loading from "@components/loading/Loading";
import { useWorkoutTask } from "@hooks/program/useWorkoutTask";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { useView } from "@modules/RecipeDetailMain/useView";
import { useViewCount } from "@modules/RecipeDetailMain/useViewCount";
import ReelViewMain from "@modules/ReelViewMain";
import { useRoute } from "@react-navigation/native";
import { View } from "react-native";

export interface ReelViewParams {
  taskId: string;
}

const ReelView = () => {
  const route = useRoute();
  const params = route.params as ReelViewParams;

  useScreenTrack();
  // useForcePortrait();

  const { task, loading } = useWorkoutTask(params.taskId);

  useView("reelSeen");
  useViewCount("reel", task?.name);

  // console.log(task?.name, task?.reelPlaybackId);

  return (
    <>
      {loading ? (
        <View className="bg-[#232136] flex-1 flex justify-center items-center relative z-0">
          <Loading fill="#FF33A1" width="w-20" height="h-20" />
        </View>
      ) : (
        <ReelViewMain
          taskId={task?.id}
          media={task?.reelMedia}
          thumbnail={task?.reelThumbnail}
          name={task?.name}
          description={task?.description}
          creatorId={task?.userId}
          playbackId={task?.reelPlaybackId}
          deeplink={task?.deepLink}
        />
      )}
    </>
  );
};

export default ReelView;
