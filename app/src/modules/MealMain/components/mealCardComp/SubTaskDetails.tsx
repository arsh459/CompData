import SvgIcons from "@components/SvgIcons";
import { useMealStore } from "@modules/MealMain/store/useMealStore";
import { useConfigContext } from "@providers/Config/ConfigProvider";
import clsx from "clsx";
import { View, Text } from "react-native";
import { shallow } from "zustand/shallow";

import {
  getCardDetailsV4,
  getMetricDetails,
} from "@modules/HomeScreen/MyPlan/utils";

interface Props {
  subTaskId: string;
}

const SubTaskDetails: React.FC<Props> = ({ subTaskId }) => {
  const { subTask } = useMealStore((state) => {
    return {
      subTask: state?.subTasks?.[subTaskId],
    };
  }, shallow);

  const { config } = useConfigContext();
  const metric = getMetricDetails(subTask, config?.nutritionMetrics);
  const details = getCardDetailsV4(subTask?.kcal, metric?.value, metric?.unit);

  return subTask ? (
    <View>
      <View className="pr-2">
        <Text
          numberOfLines={2}
          style={{ fontFamily: "Poppins-Medium" }}
          className={clsx(
            "text-xs text-white iphoneX:text-sm",
            "pb-3 tracking-wide"
          )}
        >
          {subTask.taskName}
        </Text>
      </View>
      <View className="flex flex-row pb-3 items-center">
        {details?.map((item) => (
          <View
            key={item.icon}
            className="flex flex-row justify-center items-center mr-4"
          >
            <View className="w-3 iphoneX:w-3 aspect-square mr-1 iphoneX:mr-1.5">
              <SvgIcons iconType={item.icon} color={"#ffffffb3"} />
            </View>
            <View className="h-full ">
              <Text
                style={{ fontFamily: "Poppins-Regular" }}
                className="text-[11px] text-[#ffffffb3]  "
              >
                {item.text}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  ) : (
    <View />
  );
};
export default SubTaskDetails;
