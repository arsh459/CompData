import SvgIcons from "@components/SvgIcons";
import { KPIConfig } from "@models/Tasks/SystemKPIs";
import { GoalKPIList } from "@utils/goalprogram/utils";
import clsx from "clsx";
import { View, Text } from "react-native";
interface Props {
  kpiValue: GoalKPIList;
}
const SingleKPI: React.FC<Props> = ({ kpiValue }) => {
  //   ?const svgColor =
  //    ? color === "red" ? "#F15454" : color === "blue" ? "#2096E8" : "#F19B38";
  const kpi = kpiValue.systemKPI;
  const iconType = KPIConfig[kpi]?.icon;
  const unit = KPIConfig[kpi]?.unit;
  const color = kpiValue.color;
  const value = kpiValue.actualValue;
  const target = kpiValue.targetVal;
  return (
    <View
      className={clsx(
        color === "#F15454"
          ? "text-[#F15454]"
          : color === "#2096E8"
          ? "text-[#2096E8]"
          : "text-[#F19B38]",
        ""
      )}
    >
      <View className="iphoneX:text-xl w-full flex flex-row">
        <View
          className={clsx(
            "mt-0.5 inline-block align-middle h-4 iphoneX:h-6",
            iconType === "characters" ||
              iconType === "words" ||
              iconType === "sentencesphy"
              ? "w-10 iphoneX:w-16"
              : "w-4 iphoneX:w-6"
          )}
        >
          <SvgIcons iconType={iconType} color={color} />
        </View>
        <View className="ml-2 iphoneX:ml-4">
          <Text className="iphoneX:text-xl " style={{ color }}>
            {value ? value : "0"} / {target}
          </Text>
          <Text
            className="text-xs iphoneX:text-sm line-clamp font-light capitalize "
            style={{ color }}
            numberOfLines={1}
          >
            {unit}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SingleKPI;
