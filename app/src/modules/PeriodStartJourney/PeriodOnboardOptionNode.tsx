import { View, Text } from "react-native";
import clsx from "clsx";

const PeriodOnboardOptionNode: React.FC<{
  progress?: number;
}> = ({ progress }) => (
  <View className="flex">
    <Text className="text-[#F5F5F7] text-xs font-sans  text-center ">
      Period Scanning
    </Text>
    {progress ? (
      <View className="w-full flex flex-row items-center justify-center ">
        <View className="w-1/6 h-1 bg-white/25 rounded-full overflow-hidden ">
          <View
            className="h-full bg-[#FF5970] rounded-full"
            style={{
              width: `${
                100 * (progress > 0.3 ? 1 : progress < 0 ? 0 : progress)
              }%`,
            }}
          />
        </View>
        <View
          className={clsx(
            "w-2 aspect-square mx-2  rounded-full",
            progress > 0.3 ? "bg-[#FF5970]" : "bg-white/25 "
          )}
        />
        <View className="w-1/6 h-1 bg-white/25 rounded-full overflow-hidden my-4">
          <View
            className="h-full bg-[#FF5970] rounded-full"
            style={{
              width: `${100 * (progress > 0.6 ? 1 : 0)}%`,
            }}
          />
        </View>
        <View
          className={clsx(
            "w-2 aspect-square mx-2 bg-[#FF5970] rounded-full",
            progress > 0.6 ? "bg-[#FF5970]" : "bg-white/25 "
          )}
        />

        <View className="w-1/6 h-1 bg-white/25 rounded-full overflow-hidden my-4">
          <View
            className="h-full bg-[#FF5970] rounded-full"
            style={{
              width: `${100 * (progress > 0.9 ? 1 : 0)}%`,
            }}
          />
        </View>
      </View>
    ) : null}
  </View>
);

export default PeriodOnboardOptionNode;
