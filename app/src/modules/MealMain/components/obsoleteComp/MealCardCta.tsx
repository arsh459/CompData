import SvgIcons from "@components/SvgIcons";
import { Text, TouchableOpacity, View } from "react-native";
import { useMealStore } from "../../store/useMealStore";

interface Props {
  subTaskId: string;
  isFirstClick: boolean;
  setIsFirstClick: (val: boolean) => void;
}

const MealCardCta: React.FC<Props> = ({
  subTaskId,
  isFirstClick,
  setIsFirstClick,
}) => {
  const { isLocked, qtyStep, qty, onUpdateQty } = useMealStore((state) => {
    return {
      isLocked: state.isLocked,
      qtyStep:
        (state.subTasks[subTaskId] && state.subTasks[subTaskId].qtyStep) || 0.5,
      qty:
        (state.subTaskState[subTaskId] &&
          state.subTaskState[subTaskId].subTaskQty) ||
        0,
      onUpdateQty: state.onUpdateQty,
    };
  });

  const handleFirstClick = () => {
    onUpdateQty(subTaskId, 1, "add");
    setIsFirstClick(false);
  };

  const handleSetCount = (type: "add" | "remove") => {
    if (type === "add" && qty < 25) {
      onUpdateQty(subTaskId, qtyStep, "add");
    }
    if (type === "remove" && qty > 0) {
      onUpdateQty(subTaskId, qtyStep, "remove");
    }
  };

  return isLocked ? null : (
    <View className="w-[28%] aspect-[16/6]">
      {isFirstClick ? (
        <TouchableOpacity
          onPress={handleFirstClick}
          className="w-full h-full flex justify-center items-center bg-white rounded-xl"
        >
          <Text
            className="text-[#6D55D1] text-base"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            Add
          </Text>
        </TouchableOpacity>
      ) : (
        <View className="w-full h-full flex flex-row justify-between items-center bg-[#6D55D1] rounded-xl py-1">
          <TouchableOpacity
            onPress={() => handleSetCount("remove")}
            className="h-full aspect-square p-2"
          >
            <SvgIcons iconType="minus" color="#FF5588" />
          </TouchableOpacity>
          <Text
            className="flex-1 text-white text-center text-base"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {qty}
          </Text>
          <TouchableOpacity
            onPress={() => handleSetCount("add")}
            className="h-full aspect-square p-2"
          >
            <SvgIcons iconType="plus" color="#51FF8C" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MealCardCta;
