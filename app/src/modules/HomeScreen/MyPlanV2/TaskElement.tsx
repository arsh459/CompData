import { exerciseLogoNew } from "@constants/imageKitURL";
import { useDayRec } from "@hooks/dayRecs/useDayRec";
import { getLabelsForWorkout } from "@hooks/program/utils";
import { getStartTime } from "@modules/Nutrition/V2/DaySelector/provider/utils";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useUserStore } from "@providers/user/store/useUserStore";
import { useNavigation } from "@react-navigation/native";
import { shallow } from "zustand/shallow";
import ElementCard from "./ElementCard";
import { handleWorkoutClick } from "./utils";

const TaskElement = () => {
  const navigation = useNavigation();
  const { today } = useAuthContext();

  const { badgeIdEnrolled, badgeId, startTime } = useUserStore((state) => {
    return {
      badgeIdEnrolled: state.user?.badgeIdEnrolled,
      badgeId: state.user?.badgeId,
      // start: state.user?.recommendationConfig?.start,
      // nutritionStart: state.user?.recommendationConfig?.nutritionStart,
      // badgeConfig: state.user?.recommendationConfig?.badgeConfig,
      startTime: getStartTime(
        state.user?.recommendationConfig?.badgeConfig,
        state.user?.badgeId,
        "workout",
        state.user?.recommendationConfig?.start,
        undefined
      ),
    };
  }, shallow);

  const { recomendation } = useDayRec(today, "workout", badgeId, true);

  const { title, subtitle, progress } = getLabelsForWorkout(recomendation);

  const onWorkoutPlanClick = () => {
    handleWorkoutClick(navigation, badgeIdEnrolled, badgeId, startTime);
  };

  return (
    <ElementCard
      colors={["#343150", "#343150"]}
      text={title}
      subText={subtitle}
      imgUrl={exerciseLogoNew}
      progress={progress}
      onPress={onWorkoutPlanClick}
      activeColor="#2ED5FF"
      inActiveColor="#22BDFF40"
      textColors={["#58F5FF", "#10BFFF"]}
    />
  );
};

export default TaskElement;
