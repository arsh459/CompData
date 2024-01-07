import { useWorkoutTask } from "@hooks/program/useWorkoutTask";
import { useRoute } from "@react-navigation/native";
import Header from "@modules/Header";
import RecipeDetailMain from "@modules/RecipeDetailMain";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { useViewCount } from "@modules/RecipeDetailMain/useViewCount";
// import { useNavigation } from "@react-navigation/native";
// import { View, Text } from "react-native";
// import CustomRecipeButton from "./CustomRecipeButton";

export interface RecipeeDetailScreenParams {
  taskId: string;
}

const RecipeeDetailScreen = () => {
  const route = useRoute();
  useScreenTrack();
  const params = route.params as RecipeeDetailScreenParams;
  const { task } = useWorkoutTask(params.taskId);
  useViewCount("recipe", task?.name);

  return (
    <>
      <Header
        back={true}
        headerColor="#232136"
        tone="dark"
        headerType="transparent"
      />
      <RecipeDetailMain task={task} />
    </>
  );
};

export default RecipeeDetailScreen;
