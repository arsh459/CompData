import { Text, View, TouchableOpacity } from "react-native";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  view1: string;
  view2: string;
  currView: string;
  onView1: () => void;
  onView2: () => void;
  bgColor?: string;
  fontSize?: string;
  selectedViewHighlightColors?: string[];
  showLine?: boolean;
  lineStyle?: string;
}

const ViewSelectorV3: React.FC<Props> = ({
  view1,
  view2,
  currView,
  onView1,
  onView2,
  bgColor,
  fontSize,
  selectedViewHighlightColors,
  showLine,
  lineStyle,
}) => {
  return (
    <View className={clsx("flex flex-row items-center", bgColor)}>
      <TouchableOpacity
        className="flex-1 flex justify-center items-center"
        onPress={onView1}
      >
        <View className={clsx("relative z-0 py-3 ", showLine && "w-2/5")}>
          <Text
            className={clsx(
              "capitalize text-center",
              fontSize ? fontSize : "text-sm text-white"
            )}
            style={{ fontFamily: "Nunito-Regular" }}
          >
            {view1}
          </Text>
          <LinearGradient
            colors={
              selectedViewHighlightColors && selectedViewHighlightColors.length
                ? selectedViewHighlightColors.length > 1
                  ? selectedViewHighlightColors
                  : [
                      ...selectedViewHighlightColors,
                      ...selectedViewHighlightColors,
                    ]
                : ["#FFFFFF", "#FFFFFF"]
            }
            start={{ x: 1, y: 0.5 }}
            end={{ x: 0, y: 0.5 }}
            className="absolute left-0 right-0 bottom-0 h-1 rounded-sm"
            style={{ display: currView === view1 ? "flex" : "none" }}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-1 flex justify-center items-center"
        onPress={onView2}
      >
        <View className={clsx("relative z-0 py-3 ", showLine && "w-2/5")}>
          <Text
            className={clsx(
              "capitalize w-full  text-center",
              fontSize ? fontSize : "text-sm text-white"
            )}
            style={{ fontFamily: "Nunito-Regular" }}
          >
            {view2}
          </Text>
          <LinearGradient
            colors={
              selectedViewHighlightColors && selectedViewHighlightColors.length
                ? selectedViewHighlightColors.length > 1
                  ? selectedViewHighlightColors
                  : [
                      ...selectedViewHighlightColors,
                      ...selectedViewHighlightColors,
                    ]
                : ["#FFFFFF", "#FFFFFF"]
            }
            start={{ x: 1, y: 0.5 }}
            end={{ x: 0, y: 0.5 }}
            className="absolute left-0 right-0 bottom-0 h-1 rounded-sm"
            style={{ display: currView === view2 ? "flex" : "none" }}
          />
        </View>
      </TouchableOpacity>
      {showLine ? (
        <View
          className={clsx(
            " absolute left-0 right-0 bottom-0 h-px rounded-sm bg-[#D8D8D8]/10  ",
            lineStyle
          )}
        />
      ) : null}
    </View>
  );
};

export default ViewSelectorV3;
