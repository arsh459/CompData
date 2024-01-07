import { useMealStore } from "@modules/MealMain/store/useMealStore";
import { TouchableOpacity } from "react-native";
import AddIcon from "../iconComp/AddIcon";
import DoneIconV2 from "../iconComp/DoneIconV2";

interface Props {
  subTaskId: string;
}

const MealCardTrackStatus: React.FC<Props> = ({ subTaskId }) => {
  const { onUpdateQty, qty } = useMealStore((state) => ({
    qty:
      (state.subTaskState[subTaskId] &&
        state.subTaskState[subTaskId].subTaskQty) ||
      0,
    onUpdateQty: state.onUpdateQty,
  }));

  return (
    <TouchableOpacity className="h-full flex py-1">
      {qty ? (
        <TouchableOpacity
          className="w-5 h-5"
          onPress={() => {
            onUpdateQty(subTaskId, qty, "remove");
          }}
        >
          <DoneIconV2 />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="w-5 h-5"
          onPress={() => {
            onUpdateQty(subTaskId, 1, "add");
          }}
        >
          <AddIcon />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default MealCardTrackStatus;
