import { View } from "react-native";
import clsx from "clsx";
import WeightEdit from "./WeightEdit";

interface Props {
  initialValue: number;
  onNumberFieldsUpdate: (val: number) => void;
  target: "weight" | "desiredWeight";
  isTransparent?: boolean;
  containerStyleTw?: string;
  scaleStyleTw?: string;
}

const SetWeightNew: React.FC<Props> = ({
  initialValue,
  onNumberFieldsUpdate,
  containerStyleTw,
  target,
}) => {
  return (
    <View
      className={clsx(
        "w-full flex-1 flex justify-center items-centers relative z-0",
        containerStyleTw
      )}
    >
      <WeightEdit
        current={initialValue}
        onChange={onNumberFieldsUpdate}
        unit="kg"
        target={target}
      />
    </View>
  );
};

export default SetWeightNew;
