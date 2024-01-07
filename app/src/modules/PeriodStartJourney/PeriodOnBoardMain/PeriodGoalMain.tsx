import PeriodOnboardWrapper from "../PeriodOnboardWrapper";
import { PeriodGoalList, savePeriodTrackerObj } from "../utils";
import ListGoalCard from "../ListGoalCard";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "@providers/user/UserProvider";
import { useState } from "react";
import { periodTrackerGoal } from "@models/User/User";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
interface Props {
  isGoback?: boolean;
}

const PeriodGoalMain: React.FC<Props> = ({ isGoback }) => {
  const { navigate } = useNavigation();
  const { user } = useUserContext();
  const initialValue = user?.periodTrackerObj?.goal;
  const [goal, setGoal] = useState<periodTrackerGoal | undefined>(initialValue);
  const handleNext = async () => {
    weEventTrack("periodGoal_clickSet", {});

    if (initialValue !== goal) {
      await savePeriodTrackerObj(
        { ...user?.periodTrackerObj, goal: goal },
        user?.uid
      );
    }
    isGoback
      ? navigate("PeriodOnboardSettingScreen")
      : navigate("AddCurrentCycleLength");
  };

  return (
    <PeriodOnboardWrapper
      title={`What is your goal of period tracking?`}
      onNext={goal ? handleNext : undefined}
      progress={1 / 3}
      nextBtnText={isGoback ? "Save" : "Next"}
    >
      {PeriodGoalList?.map((item) => (
        <ListGoalCard
          key={item.icon}
          icon={item.icon}
          text={item.text}
          isSelected={goal === item.type}
          onPress={() => setGoal(item.type)}
        />
      ))}
    </PeriodOnboardWrapper>
  );
};

export default PeriodGoalMain;
