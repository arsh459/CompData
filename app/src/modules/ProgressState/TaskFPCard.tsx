import { baseImageKit, fPointsWhite } from "@constants/imageKitURL";
import { useUserActivity } from "@hooks/activity/useUserActivity";
import { useWorkoutTask } from "@hooks/program/useWorkoutTask";
import { format } from "date-fns";
// import { useAuthContext } from "@providers/auth/AuthProvider";
// import { useGameContext } from "@providers/game/GameProvider";
// import { useUserTaskProgress } from "@providers/task/hooks/useUserTaskProgress";
// import { getUserFP } from "@providers/task/hooks/utils";
import { View, Text, Image } from "react-native";

interface Props {
  actId: string;
  uid: string;
}

const TaskFPCard: React.FC<Props> = ({ actId, uid }) => {
  // const { state } = useAuthContext();
  // const { params } = useGameContext();

  const { activity } = useUserActivity(actId, uid);

  const { task } = useWorkoutTask(activity?.taskId);

  // const { taskProgress } = useUserTaskProgress(taskId);

  const userFP = Math.round((activity?.calories ? activity.calories : 0) / 300);

  return (
    <View className="flex flex-row justify-between items-center px-4 py-3 border-t border-white/20">
      <View className="flex-1 pr-2">
        <Text
          className="text-[#D9D9D9] text-sm"
          style={{ fontFamily: "BaiJamjuree-SemiBold" }}
        >
          {task?.name}
        </Text>
        {activity?.createdOn ? (
          <Text
            style={{ fontFamily: "BaiJamjuree-light" }}
            className=" text-xs text-[#D9D9D9]"
          >
            {format(new Date(activity?.createdOn), "d MMM h:mmaaa")}
          </Text>
        ) : null}
      </View>
      <View className="flex flex-row items-center">
        <Image
          source={{ uri: `${baseImageKit}/${fPointsWhite}` }}
          className="w-4 aspect-square mr-2"
          resizeMode="contain"
        />
        <Text
          className="text-[#D9D9D9]"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {userFP}/{task?.fitPoints} FP
        </Text>
      </View>
    </View>
  );
};

export default TaskFPCard;
