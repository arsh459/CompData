import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { useMealStore } from "../../store/useMealStore";

const arr: number[] = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5];
interface Props {
  subTaskId: string;
  isFirstClick: boolean;
  setIsFirstClick: (val: boolean) => void;
}
const QtyPicker: React.FC<Props> = ({
  subTaskId,
  isFirstClick,
  setIsFirstClick,
}) => {
  const [selectedValue, setSelectedValue] = useState<number>(1);
  const { qty, onUpdateQty, servingValue } = useMealStore((state) => {
    return {
      isLocked: state.isLocked,
      qtyStep:
        (state.subTasks[subTaskId] && state.subTasks[subTaskId].qtyStep) || 0.5,
      qty:
        (state.subTaskState[subTaskId] &&
          state.subTaskState[subTaskId].subTaskQty) ||
        0,
      onUpdateQty: state.onUpdateQty,
      servingValue: state.subTasks[subTaskId].gptInfo
        ? state.subTasks[subTaskId].gptInfo?.gptServingType
        : state.subTasks[subTaskId].servingType
        ? state.subTasks[subTaskId].servingType
        : "",
    };
  });

  useEffect(() => {
    if (qty !== 0) {
      setSelectedValue(qty);
    }
  }, [qty]);
  return (
    <View className=" bg-[#2A2842] items-center justify-center rounded-xl">
      <Picker
        selectedValue={selectedValue}
        style={{
          height: 36,
          width: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        itemStyle={{
          display: "flex",
          justifyContent: "center",
          textAlign: "right",
        }}
        onValueChange={(itemValue: number, itemIndex: number) => {
          if (qty > itemValue) {
            onUpdateQty(subTaskId, qty - itemValue, "remove");
            // setSelectedValue(itemValue);
          } else if (qty < itemValue) {
            onUpdateQty(subTaskId, itemValue - qty, "add");
            // setSelectedValue(itemValue);
          } else {
            // setSelectedValue(itemValue);
          }
        }}
      >
        {arr.map((item) => {
          return (
            <Picker.Item
              label={item.toString() + " " + servingValue}
              value={item}
              color={"#A6A3BF"}
              style={{ fontSize: 12, fontFamily: "Nunito-Bold" }}
              // fontFamily="Nunito-SemiBold"
            />
          );
        })}
      </Picker>
    </View>
  );
};

export default QtyPicker;

// const MealCardPicker = () => {};

// export default MealCardPicker;
