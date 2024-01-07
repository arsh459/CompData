import { View, Text } from "react-native";

import clsx from "clsx";

interface Props {
  label: string;
  value?: string | number;
  suffix?: string;
  showRight?: boolean;
  showWrong?: boolean;
  showBorder?: boolean;
  styleTw?: string;
}
const PlanDetailItem: React.FC<Props> = ({
  label,
  value,
  suffix,
  showRight,
  showWrong,
  showBorder,
  styleTw,
}) => {
  const shouldShowRight =
    showRight ??
    ((typeof value === "number" && value > 0) ||
      (typeof value == "boolean" && value === true) ||
      (typeof value == "string" && value === "Yes"));
  const shouldShowWrong =
    showWrong ??
    ((typeof value === "number" && value === 0) ||
      (typeof value == "boolean" && value === true) ||
      (typeof value == "string" && value === "No"));
  return (
    <View
      className={clsx(
        "py-4 flex flex-row bg-red-700  ",
        showBorder && "sm:border-b-[1px] sm:border-white/20",
        styleTw
      )}
    >
      <View className="flex flex-row items-center">
        {shouldShowRight && (
          <Text className="w-5 text-green-700 aspect-[10/7]">R</Text>
        )}
        {shouldShowWrong && (
          <Text className="w-5 text-red-600 aspect-[10/7]">W</Text>
        )}
        <Text className="pl-1">{value}</Text>
      </View>
      <Text className="text-xs text-white/70 font-popL">{suffix}</Text>
    </View>
  );
};

export default PlanDetailItem;
