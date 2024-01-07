import SvgIcons from "@components/SvgIcons";
import {
  getQuantityDetails,
  getRecQuantity,
} from "@modules/HomeScreen/MyPlan/utils";
import { useMealStore } from "@modules/MealMain/store/useMealStore";
import clsx from "clsx";
import { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { shallow } from "zustand/shallow";
import MealCardQtyModal from "./MealCardQtyModal";

interface Props {
  subTaskId: string;
  itemQuantity?: number;
}

const QuantitySelector: React.FC<Props> = ({ subTaskId, itemQuantity }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { subTask, qty, changes } = useMealStore((state) => {
    return {
      subTask: state?.subTasks?.[subTaskId],
      qty:
        (state.subTaskState[subTaskId] &&
          state.subTaskState[subTaskId].subTaskQty) ||
        0,
      changes: state.changes[subTaskId],
    };
  }, shallow);

  const { recQtyString } = getRecQuantity(
    itemQuantity,
    subTask?.servingValue
      ? subTask.servingValue
      : subTask.gptInfo
      ? subTask.gptInfo.gptServingValue
      : undefined,
    subTask.servingType
      ? subTask.servingType
      : subTask.gptInfo
      ? subTask.gptInfo.gptServingType
      : undefined
  );

  const { quantityStr } = getQuantityDetails(
    qty,
    subTask?.servingValue
      ? subTask.servingValue
      : subTask.gptInfo
      ? subTask.gptInfo.gptServingValue
      : undefined,
    subTask.servingType
      ? subTask.servingType
      : subTask.gptInfo
      ? subTask.gptInfo.gptServingType
      : undefined
  );

  return (
    <TouchableOpacity
      className={clsx(
        "flex-1 items-center justify-around h-9 Class min-w-[126] w-[50%] rounded-2xl flex-row",
        qty ? "bg-[#ffffff26]" : "bg-[#2A2842]"
      )}
      onPress={() => {
        setIsVisible((prev) => !prev);
      }}
    >
      <View>
        <Text
          className="text-xs text-[#fff]"
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          {/* {quantityStr} */}

          {changes ? quantityStr : qty ? quantityStr : recQtyString}
          {/* {trackedSubTaskState || modificationSubTask
            ? quantityStr
            : recQtyString} */}
        </Text>
      </View>
      <View>
        <View className="w-2 h-2 rotate-90">
          <SvgIcons iconType="rightArrowSlim" color="#fff" />
        </View>
      </View>

      <MealCardQtyModal
        isVisible={isVisible}
        defaultValue={itemQuantity ? itemQuantity : 1}
        onClose={() => {
          setIsVisible(false);
        }}
        subTaskId={subTaskId}
      />
    </TouchableOpacity>
  );
};

export default QuantitySelector;
