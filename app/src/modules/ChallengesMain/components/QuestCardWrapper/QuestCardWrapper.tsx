import { challengeTaskType } from "@models/Rounds/interface";
import { View } from "react-native";
// import DailyRewardQuest from "./DailyRewardQuest";
import DailyWorkoutQuest from "./DailyWorkoutQuest";
import DailyDietQuest from "./DailyDietQuest";
import DailyTasks from "./DailyTasks";
// import ReferFriendQuest from "./ReferFriendQuest";
import DailyStepsQuest from "./DailyStepsQuest";

interface Props {
  taskType: challengeTaskType;
}

const QuestCardWrapper: React.FC<Props> = ({ taskType }) => {
  return (
    <View>
      {taskType === "dailyReward" ? null : taskType === "assignedWorkout" ? ( // <DailyRewardQuest />
        <DailyWorkoutQuest />
      ) : taskType === "assignedDiet" ? (
        <DailyDietQuest />
      ) : taskType === "additionalBadgeIds" ? (
        <DailyTasks />
      ) : // taskType === "referFriend" ? (
      //<ReferFriendQuest />
      // ) :

      taskType === "dailySteps" ? (
        <DailyStepsQuest />
      ) : (
        <></>
      )}
    </View>
  );
};

export default QuestCardWrapper;
