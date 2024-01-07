// SectionSwapList
import { View } from "react-native";

// import useNutritionTasks from "@hooks/program/useNutritionTasks";
// import Loading from "@components/loading/Loading";
// import { useBadgeProgressContext } from "@providers/BadgeProgressProvider/BadgeProgressProvider";
// import SwapListCard from "./SwapListCard";

interface Props {
  // sectionName: string;
  sectionId: string;
  selectedDay: number;
}
const SectionSwapList: React.FC<Props> = ({
  // sectionName,
  sectionId,
  selectedDay,
}) => {
  // const { badgeId: nutritionBadgeId } = useBadgeProgressContext();

  // const { tasks, loading } = useNutritionTasks(
  //   nutritionBadgeId,
  //   sectionId,
  //   selectedDay,
  //   true
  // );
  return <View />;

  // return tasks.length ? (
  //   <View className="my-1.5 ">
  //     {!loading ? (
  //       <View className="w-full flex justify-center items-center">
  //         <SwapListCard singleTask={tasks[0]} />
  //       </View>
  //     ) : loading ? (
  //       <View className="w-full flex justify-center items-center pt-4">
  //         <Loading />
  //       </View>
  //     ) : null}
  //   </View>
  // ) : null;
};

export default SectionSwapList;
