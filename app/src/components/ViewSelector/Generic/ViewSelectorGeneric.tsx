import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";

interface ViewProps {
  label: string;
  onPress: () => void;
  overRideLabel?: string;
}

interface Props {
  selectedViewHighlightColors?: string[];
  views: ViewProps[];
  currView: string;
  bgColor?: string;
  fontSize?: string;
  fitToWidth?: boolean;
  itemBgColor?: string;
  selectedTextColor?: string;
  showLine?: boolean;
  paddingText?: string;
}

const ViewSelectorGeneric: React.FC<Props> = (props) => {
  return (
    <View
      className={clsx(
        "flex flex-row items-center overflow-scroll",
        props.bgColor
      )}
    >
      {props.fitToWidth ? (
        <View className="flex-1 flex flex-row">
          <HelperComp {...props} />
        </View>
      ) : (
        <ScrollView
          horizontal={true}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          className="flex-1 flex flex-row"
        >
          <HelperComp {...props} />
        </ScrollView>
      )}
    </View>
  );
};

export default ViewSelectorGeneric;

const HelperComp: React.FC<Props> = ({
  views,
  currView,
  bgColor,
  fontSize,
  selectedViewHighlightColors,
  fitToWidth,
  itemBgColor,
  selectedTextColor,
  showLine = true,
  paddingText,
}) => {
  return (
    <>
      {views.map((view, index) => (
        <TouchableOpacity
          key={index}
          className={clsx(
            "flex-1 flex justify-center items-center mx-2",
            currView === view.label ? (itemBgColor ? itemBgColor : "") : ""
          )}
          onPress={view.onPress}
        >
          <View
            className={clsx("relative z-0 ", paddingText ? paddingText : "p-3")}
          >
            <Text
              className={clsx(
                "capitalize text-center",
                fontSize ? fontSize : "text-sm text-white",
                currView === view.label
                  ? selectedTextColor
                    ? selectedTextColor
                    : ""
                  : ""
              )}
              style={{ fontFamily: "Nunito-SemiBold" }}
            >
              {view.overRideLabel ? view.overRideLabel : view.label}
            </Text>
            {showLine === false ? null : (
              <LinearGradient
                colors={
                  selectedViewHighlightColors &&
                  selectedViewHighlightColors.length
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
                className="absolute left-0 right-0 bottom-0 h-0.5 rounded-sm"
                style={{ display: currView === view.label ? "flex" : "none" }}
              />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
};
