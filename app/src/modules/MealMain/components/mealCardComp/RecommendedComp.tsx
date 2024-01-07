import { SubTaskElement } from "@models/Tasks/Task";
import {
  getRecQuantity,
  getQuantityDetails,
} from "@modules/HomeScreen/MyPlan/utils";
import { useMealStore } from "@modules/MealMain/store/useMealStore";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { shallow } from "zustand/shallow";

interface Props {
  item: SubTaskElement;
}

const RecommendedComp: React.FC<Props> = ({ item }) => {
  const [recommendedStr, setrecommendedStr] = useState<string>();
  const { subTask, qty } = useMealStore((state) => {
    return {
      subTask: state?.subTasks?.[item.subTaskId],
      qty:
        (state.subTaskState[item.subTaskId] &&
          state.subTaskState[item.subTaskId].subTaskQty) ||
        0,
    };
  }, shallow);

  const { recQty, recString } = getRecQuantity(
    item?.qty,
    subTask?.servingValue
      ? subTask.servingValue
      : subTask.gptInfo
      ? subTask.gptInfo.gptServingValue
      : undefined,
    // subTask.gptInfo ? subTask.gptInfo.gptServingValue : subTask.servingValue,
    subTask.servingType
      ? subTask.servingType
      : subTask.gptInfo
      ? subTask.gptInfo.gptServingType
      : undefined
    // subTask.gptInfo ? subTask.gptInfo.gptServingType : subTask?.servingType
  );

  const { quantity } = getQuantityDetails(
    qty,
    subTask?.servingValue
      ? subTask.servingValue
      : subTask.gptInfo
      ? subTask.gptInfo.gptServingValue
      : undefined,
    // subTask.gptInfo ? subTask.gptInfo.gptServingValue : subTask.servingValue,
    subTask.servingType
      ? subTask.servingType
      : subTask.gptInfo
      ? subTask.gptInfo.gptServingType
      : undefined
    // subTask.gptInfo ? subTask.gptInfo.gptServingType : subTask?.servingType
  );

  useEffect(() => {
    if (recQty && quantity !== recQty) {
      setrecommendedStr(recString);
    } else {
      setrecommendedStr(undefined);
    }
  }, [quantity, recQty, recString]);

  return (
    <>
      {recommendedStr ? (
        <View className="pt-4">
          <Text
            numberOfLines={1}
            style={{ color: "#E5B556", fontFamily: "Nunito-Regular" }}
            className="text-xs text-center"
          >
            {recommendedStr}
          </Text>
        </View>
      ) : null}
    </>
  );
};

export default RecommendedComp;
