import { View } from "react-native";
import { useState } from "react";
import ToggleDropDown from "./ToggleDropDown";
import useNutritionTasks from "@hooks/program/useNutritionTasks";
import NutriCard from "./NutriCard";
import Loading from "@components/loading/Loading";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useBadgeProgressContext } from "@providers/BadgeProgressProvider/BadgeProgressProvider";
import { MealTypes } from "@models/Tasks/Task";

interface Props {
  sectionName: string;
  sectionId: string;
  selectedDay: number;
  imgHeight: number;
}
const SectionToggle: React.FC<Props> = ({
  sectionName,
  sectionId,
  selectedDay,
  imgHeight,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { badgeId: nutritionBadgeId } = useBadgeProgressContext();

  const { tasks, loading } = useNutritionTasks(
    nutritionBadgeId,
    sectionId as MealTypes,
    // selectedDay,
    true
  );

  const toggleOpen = () => {
    setIsOpen((p) => !p);

    weEventTrack("nutrition_clickToggle", {});
  };

  return tasks.length ? (
    <View className="my-1.5">
      <ToggleDropDown
        sectionName={sectionName}
        isOpen={isOpen}
        toggler={toggleOpen}
      />
      {isOpen && !loading ? (
        <View className="w-full flex justify-center items-center">
          {tasks.map((task) => (
            <NutriCard
              task={task}
              key={task.id}
              // imgHeight={imgHeight}
              selectedDayNumber={selectedDay}
            />
          ))}
        </View>
      ) : loading ? (
        <View className="w-full flex justify-center items-center pt-4">
          <Loading />
        </View>
      ) : null}
    </View>
  ) : null;
};

export default SectionToggle;
