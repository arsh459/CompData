import CloseIcon from "@components/SvgIcons/CloseIcon";
import UseModal from "@components/UseModal";
import { FlashList } from "@shopify/flash-list";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { useMealStore } from "../../store/useMealStore";
import { shallow } from "zustand/shallow";
import { getQuantityDetails } from "@modules/HomeScreen/MyPlan/utils";
import { getInitialArr } from "./utils";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  subTaskId: string;
  defaultValue: number;
}

const MealCardQtyModal: React.FC<Props> = ({
  isVisible,
  onClose,
  subTaskId,
  defaultValue,
}) => {
  const [qtyArr, setQtyArr] = useState<number[]>([]);
  // console.log("MealCardQtyModal_subtaskId_26", subTaskId);

  const {
    qty,
    onUpdateQty,
    servingType,
    servingValue,
    qtyStep,
    setChanges,
    changes,
  } = useMealStore((state) => {
    return {
      qty:
        (state.subTaskState[subTaskId] &&
          state.subTaskState[subTaskId].subTaskQty) ||
        0,
      onUpdateQty: state.onUpdateQty,
      changes: state.changes[subTaskId],
      qtyStep:
        (state.subTasks[subTaskId] && state.subTasks[subTaskId].qtyStep) || 0.5,
      servingType: state.subTasks[subTaskId].servingType
        ? state.subTasks[subTaskId].servingType
        : state.subTasks[subTaskId].gptInfo
        ? state.subTasks[subTaskId].gptInfo?.gptServingType
        : "",
      servingValue: state.subTasks[subTaskId].servingValue
        ? state.subTasks[subTaskId].servingValue
        : state.subTasks[subTaskId].gptInfo
        ? state.subTasks[subTaskId].gptInfo?.gptServingValue
        : 1,
      setChanges: state.setChanges,
    };
  }, shallow);

  useEffect(() => {
    if (subTaskId) {
      getInitialArr(qty ? qty : defaultValue, defaultValue, setQtyArr, qtyStep);
    }
  }, [subTaskId]);

  const renderItem = ({ item, index }: { item: number; index: number }) => {
    const { quantityStr } = getQuantityDetails(item, servingValue, servingType);

    function onClicking() {
      setChanges(subTaskId);
      if (qty > item) {
        onUpdateQty(subTaskId, qty - item, "remove");
        onClose();
      } else if (qty < item) {
        onUpdateQty(subTaskId, item - qty, "add");
        onClose();
      } else {
        onClose();
      }
    }
    return (
      <TouchableOpacity
        onPress={onClicking}
        className={clsx(
          "rounded-lg h-12 w-full flex items-center justify-center",
          changes
            ? qty === item
              ? "bg-white/30"
              : ""
            : defaultValue === item
            ? "bg-white/30"
            : ""
          // trackedSubTaskState || modificationSubTask
          //   ? qty === item
          //     ? "bg-white/30"
          //     : ""
          //   : defaultValue === item
          //   ? "bg-white/30"
          //   : ""
        )}
      >
        <Text
          className={clsx(
            "text-sm leading-4 text-center",
            qty === item ? "text-[#fff]" : "text-white/40",
            changes
              ? qty === item
                ? "text-[#fff]"
                : "text-white/40"
              : defaultValue === item
              ? "text-[#fff]"
              : "text-white/40"
            // trackedSubTaskState || modificationSubTask
            //   ? qty === item
            //     ? "text-[#fff]"
            //     : "text-white/40"
            //   : defaultValue === item
            //   ? "text-[#fff]"
            //   : "text-white/40"
          )}
          style={{ fontFamily: "Nunito-Bold" }}
        >
          {quantityStr}
        </Text>
      </TouchableOpacity>
    );
  };

  function onNext(maxValue: number) {
    let result: number[] = [];
    for (let i = 1; i < 6; i++) {
      result.push(maxValue + i * qtyStep);
    }
    setQtyArr((prev) => [...prev, ...result]);
  }
  const keyExtractor = (item: number, index: number) => `${item}-${index}`;

  return (
    <UseModal
      visible={isVisible}
      onClose={onClose}
      bgColor="bg-[#232136e6]"
      width="w-full"
      height="h-full"
    >
      <Pressable
        className="absolute left-0 right-0 top-0 bottom-0 -z-10"
        onPress={() => {
          onClose();
        }}
      />
      <View className="w-full relative h-full flex items-center justify-center ">
        <View className="w-full items-center justify-center mb-6">
          <Text
            className="text-white/90 text-base"
            style={{ fontFamily: "Poppins-Medium" }}
          >
            Select Quantity
          </Text>
        </View>
        <View className="w-full px-11">
          <LinearGradient
            colors={[
              "rgba(109, 85, 209, 0.7)",
              "#6D55D1",
              "rgba(109, 85, 209, 0.7)",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="w-full px-4 py-4 rounded-lg mb-5"
          >
            <View className="" style={{ height: 48 * 5 + 4 * 8 }}>
              {qtyArr.length > 0 ? (
                <FlashList
                  data={qtyArr}
                  renderItem={renderItem}
                  keyExtractor={keyExtractor}
                  onEndReached={() => {
                    onNext(qtyArr[qtyArr.length - 1]);
                  }}
                  initialScrollIndex={
                    changes
                      ? qty
                        ? Math.floor(qty / qtyStep) - 1
                        : 0
                      : defaultValue
                      ? Math.floor(defaultValue / qtyStep) - 1
                      : 0
                  }
                  snapToAlignment={"center"}
                  onEndReachedThreshold={0.7}
                  scrollEventThrottle={16}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  estimatedItemSize={48}
                  ItemSeparatorComponent={() => <View className="h-2" />}
                />
              ) : (
                <></>
              )}
            </View>
          </LinearGradient>
        </View>
        <TouchableOpacity
          onPress={onClose}
          className=" absolute bottom-28 bg-[#ffffff38]  p-5 rounded-full"
        >
          <View className=" w-5 h-5 ">
            <CloseIcon />
          </View>
        </TouchableOpacity>
      </View>
    </UseModal>
  );
};

export default MealCardQtyModal;
