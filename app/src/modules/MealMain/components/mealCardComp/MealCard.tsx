import { View } from "react-native";
import { SubTaskElement } from "@models/Tasks/Task";
import { useMealStore } from "../../store/useMealStore";
import { shallow } from "zustand/shallow";
import MealCardImage from "./MealCardImage";
import RecommendedComp from "./RecommendedComp";
import MealCardTrackStatus from "./MealCardTrackStatus";
import SubTaskDetails from "./SubTaskDetails";
import QuantitySelector from "./QuantitySelector";
import { useEffect } from "react";
import { useSubTaskUpdate } from "@modules/MealMain/hooks/useSubtaskUpdate";

interface Props {
  item: SubTaskElement;
}

const MealCard: React.FC<Props> = ({ item }) => {
  useSubTaskUpdate(item.subTaskId);

  const { subTask, qty, changes, setChanges } = useMealStore((state) => {
    return {
      subTask: state?.subTasks?.[item.subTaskId],
      qty:
        (state.subTaskState[item.subTaskId] &&
          state.subTaskState[item.subTaskId].subTaskQty) ||
        0,
      changes: state.changes[item.subTaskId],
      setChanges: state.setChanges,
    };
  }, shallow);

  // console.log("subTaskId_MealCard_29", item.subTaskId);

  useEffect(() => {
    if (qty) {
      setChanges(item.subTaskId);
    }
  }, [qty]);

  return subTask ? (
    <View
      className="my-2 p-4 px-5 "
      style={{ backgroundColor: qty ? "#2b552ca6" : undefined }}
    >
      <View className="flex flex-row items-center ">
        <MealCardImage subTaskMedia={subTask.taskMedia} />

        <View className="flex justify-between items-start flex-1 pl-4 pt-1">
          <SubTaskDetails subTaskId={item.subTaskId} />
          <QuantitySelector
            subTaskId={item.subTaskId}
            itemQuantity={item.qty}
          />
        </View>

        <MealCardTrackStatus subTaskId={item.subTaskId} />
      </View>

      {subTask.gptInfo ? (
        <></>
      ) : changes ? (
        <RecommendedComp item={item} />
      ) : (
        <></>
      )}
    </View>
  ) : (
    <View />
  );
};

export default MealCard;
