import { useRoute } from "@react-navigation/native";
import { AddNewItemScreenParams } from "@screens/AddNewItemSearchScreen";
import AddNewItemLoading from "@modules/AddNewItemLoading";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { PlainTaskProvider } from "@providers/task/PlainTaskProvider";

const AddNewItemLoadingScreen = () => {
  //setting route and navigation

  useScreenTrack();
  const route = useRoute();

  const { taskId, dayRecommendationId } =
    route.params as AddNewItemScreenParams;

  return (
    <>
      {taskId ? (
        <PlainTaskProvider selectedTaskId={taskId}>
          <AddNewItemLoading
            taskId={taskId}
            dayRecommendationId={dayRecommendationId}
          />
        </PlainTaskProvider>
      ) : (
        <>
          <AddNewItemLoading
            taskId={taskId}
            dayRecommendationId={dayRecommendationId}
          />
        </>
      )}
    </>
  );
};

export default AddNewItemLoadingScreen;
