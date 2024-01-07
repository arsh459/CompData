import { Text, View } from "react-native";
import TaskCardElement from "./TaskCardElement";
import { useBadgeDayTasks } from "../hooks/useBadgeDayTasks";
import { useUserContext } from "@providers/user/UserProvider";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { useConfigContext } from "@providers/Config/ConfigProvider";

interface Props {
  day: number;
}

const DayHolder: React.FC<Props> = ({ day }) => {
  const { user } = useUserContext();
  const { badge } = useSignleBadgeContext();
  const { tasks } = useBadgeDayTasks(badge?.id, day);

  const { config } = useConfigContext();
  const freeDays = config?.freeDays ? config.freeDays : 0;
  const isDayFree = day <= freeDays;

  return (
    <View className="px-4">
      <Text
        className="py-4 text-lg text-white"
        style={{ fontFamily: "Nunito-SemiBold" }}
      >
        Sample Day {day + 1}
      </Text>
      {tasks.map((item) => (
        <View key={item.id} className="pb-2">
          <TaskCardElement
            isDayFree={isDayFree}
            item={item}
            uid={user?.uid || ""}
          />
        </View>
      ))}
    </View>
  );
};

export default DayHolder;
