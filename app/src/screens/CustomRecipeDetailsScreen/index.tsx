import { useRoute } from "@react-navigation/native";
import Header from "@modules/Header";
import RecipeDetailMain from "@modules/RecipeDetailMain";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { useViewCount } from "@modules/RecipeDetailMain/useViewCount";
import { Task } from "@models/Tasks/Task";

const CustomRecipeeDetailScreen = () => {
  const route = useRoute();
  useScreenTrack();
  const params = route.params as Task;
  useViewCount("recipe", params?.name);

  return (
    <>
      <Header
        back={true}
        headerColor="#232136"
        tone="dark"
        headerType="transparent"
      />
      <RecipeDetailMain task={params} />
    </>
  );
};

export default CustomRecipeeDetailScreen;
