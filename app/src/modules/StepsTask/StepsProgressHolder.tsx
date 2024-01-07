import StepsSvgIcon from "@components/StepsSvg/StepsSvgIcon";
import { Text, View } from "react-native";
import TaskProgressBar from "./TaskProgressBar";

interface Props {
  progress: number;
  daySteps?: number;
  fp?: number;
  fpTarget?: number;
  isActive: boolean;
}

const StepsProgressHolder: React.FC<Props> = ({
  daySteps,
  progress,
  fp,
  fpTarget,
  isActive,
}) => {
  return (
    <View className="bg-[#262630] py-6 px-6 rounded-xl">
      <View className="pb-8">
        <TaskProgressBar
          kpi={daySteps ? daySteps : 0}
          kpiLabel="Steps taken"
          progress={progress}
          activeColor="#13BFBC"
          inActiveColor="#100F1A"
        />
      </View>

      <View className="pb-8">
        <TaskProgressBar
          kpi={fp ? fp : 0}
          kpiTarget={fpTarget}
          kpiLabel="Fitpoints earned"
          progress={progress}
          activeColor="#FF556C"
          inActiveColor="#100F1A"
        />
      </View>

      {isActive ? (
        <View className="flex flex-row justify-center items-center">
          <View className="w-5 aspect-[20/25]">
            <StepsSvgIcon startColor="#51FFD5" endColor="#51FFD5" />
          </View>
          <Text
            className="text-[#51FFD5] pl-2 opacity-80 text-sm iphoneX:text-base text-center "
            style={{ fontFamily: "BaiJamjuree-SemiBold" }}
          >
            Currently Active
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default StepsProgressHolder;
