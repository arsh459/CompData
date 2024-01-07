import { periodDateType } from "@models/User/User";
import { View } from "react-native";
import { getBottomBackgroundColor, getMainBackgroundColor } from "./utils";

type CycleIndicatorProps = {
  type: periodDateType;
  future: boolean;
  symptom?: boolean;
  radius: number;
};

const CycleIndicator: React.FC<CycleIndicatorProps> = ({
  type,
  future,
  symptom = false,
  radius,
}) => {
  const colorsMain = getMainBackgroundColor(type, future);
  const colorsBottom = getBottomBackgroundColor(type, symptom);

  const isDotted = future || type === "ESTIMATED_PERIOD" ? true : false;
  // const { width } = Dimensions.get("window");
  // const calendatItemWidth = width / 15;

  return (
    <View
      className="relative z-0 aspect-square mx-auto"
      style={{
        backgroundColor: colorsMain.backgroundColor,
        borderColor: colorsMain.borderColor,
        width: radius,
        borderWidth: 1,
        borderRadius: radius,
        borderStyle: isDotted ? "dotted" : undefined,
      }}
    >
      <View className="absolute -bottom-1/2 flex left-0 right-0  flex-row justify-center">
        <View
          className="aspect-square z-10"
          style={{
            backgroundColor: colorsBottom.backgroundColor,
            borderColor: colorsBottom.borderColor,
            width: radius * 0.6,
            borderWidth: 1,
            borderRadius: radius,
            borderStyle: isDotted ? "dotted" : undefined,
          }}
        />
      </View>
    </View>
  );
};

export default CycleIndicator;
