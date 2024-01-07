import ProgressBar from "@components/ProgressBar";
import { Text, View } from "react-native";

interface Props {
  kpi: number;
  kpiTarget?: number;
  kpiLabel: string;
  progress: number;
  activeColor: string;
  inActiveColor: string;
}

const TaskProgressBar: React.FC<Props> = ({
  kpi,
  kpiTarget,
  kpiLabel,
  progress,
  activeColor,
  inActiveColor,
}) => {
  const prog = Math.round(progress * 100);
  return (
    <View>
      <View className="flex flex-row items-baseline pb-2">
        <Text
          className="text-white opacity-80 text-3xl font-bold"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {kpi}
        </Text>
        {kpiTarget ? (
          <Text
            className="text-white opacity-80 text-3xl font-bold"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            /{kpiTarget}
          </Text>
        ) : null}
        <Text
          className="text-white opacity-80 pl-2 text-base"
          style={{ fontFamily: "BaiJamjuree-Medium" }}
        >
          {kpiLabel}
        </Text>
      </View>
      <View>
        <ProgressBar
          height={5}
          progress={prog}
          activeColor={activeColor}
          inActiveColor={inActiveColor}
        />
      </View>
    </View>
  );
};

export default TaskProgressBar;
