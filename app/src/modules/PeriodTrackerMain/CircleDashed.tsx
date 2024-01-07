import { useCurrentPeriodStore } from "@providers/period/periodStore";
import { View, Dimensions } from "react-native";
import { Circle, Svg, LinearGradient, Defs, Stop } from "react-native-svg";
import { getCircleColor } from "./utils";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { shallow } from "zustand/shallow";

const { width } = Dimensions.get("window");
export const circleSize = width * 0.8;

interface CircleProps {}
const CircleDashed: React.FC<CircleProps> = ({}) => {
  const { todayUnix } = useAuthContext();

  const { selectedObjType, unix } = useCurrentPeriodStore(
    (state) => ({
      unix: state.periodDateObjStore[state.currentlySelected]
        ? state.periodDateObjStore[state.currentlySelected].unix
        : undefined,
      selectedObjType: state.periodDateObjStore[state.currentlySelected]
        ? state.periodDateObjStore[state.currentlySelected].type
        : undefined,
    }),
    shallow
  );

  const isFuture = unix && unix > todayUnix ? true : false;

  const { fillColor, fillColor2, strokeColor, strokeWidth } = getCircleColor(
    selectedObjType,
    isFuture
  );

  return (
    <View className="">
      {fillColor2 && fillColor ? (
        <Svg className="" width={circleSize} height={circleSize}>
          <Defs>
            <LinearGradient
              id="linear-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <Stop offset="0%" stopColor={fillColor} />
              <Stop offset="100%" stopColor={fillColor2} />
            </LinearGradient>
          </Defs>
          <Circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={circleSize / 2 - strokeWidth}
            fill="url(#linear-gradient)"
            stroke={strokeColor ? strokeColor : "#000"}
            strokeDasharray={"2, 3"}
            strokeWidth={strokeWidth}
          />
        </Svg>
      ) : (
        <Svg
          className=""
          fill={fillColor ? fillColor : "none"}
          width={circleSize}
          height={circleSize}
        >
          <Circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={circleSize / 2 - strokeWidth}
            stroke={strokeColor ? strokeColor : "#000"}
            strokeDasharray={"2, 3"}
            strokeWidth={strokeWidth}
          />
        </Svg>
      )}
    </View>
  );
};
export default CircleDashed;
