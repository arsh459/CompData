import { baseImageKit, calendarIcon } from "@constants/imageKitURL";
import { taskFrequency } from "@models/Tasks/Task";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { Image, View, Text } from "react-native";

interface Props {
  taskLevel: number;
  overlay?: boolean;
  frequency?: taskFrequency;
}

const TaskKPIs: React.FC<Props> = ({
  taskLevel,

  overlay,
  frequency,
}) => {
  return (
    <LinearGradient
      colors={
        overlay ? ["#000000BF", "transparent"] : ["transparent", "transparent"]
      }
      className={clsx(
        "w-full flex justify-between items-end absolute h-1/4 top-3/4  left-0 right-0 bottom-0 pb-2 px-4 z-50"
      )}
    >
      <View className="flex items-center">
        {frequency ? (
          <>
            <Image
              source={{
                uri: `${baseImageKit}/tr:w-18,c-maintain_ratio/${calendarIcon}`,
              }}
              className="h-5 w-5"
              resizeMode="contain"
            />
            <Text className="text-white pl-2 text-xs capitalize">
              {frequency}
            </Text>
          </>
        ) : (
          <View />
        )}
      </View>
      <Text className="text-xs text-white">Lvl {taskLevel}</Text>
    </LinearGradient>
  );
};

export default TaskKPIs;
