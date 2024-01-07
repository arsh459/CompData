import clsx from "clsx";
import { Text, View, TouchableOpacity } from "react-native";

interface Props {
  view1: string;
  view2: string;
  currView: string;
  onView1: () => void;
  onView2: () => void;
  margin?: string;
  fontSize?: string;
}

const ViewSelector: React.FC<Props> = ({
  view1,
  view2,
  currView,
  onView1,
  onView2,
  margin,
  fontSize,
}) => {
  return (
    <View
      className={clsx(
        "flex flex-row  bg-[#292832] rounded-md",
        margin ? margin : "m-4"
      )}
    >
      <View
        className="flex-1 rounded-md"
        style={{
          backgroundColor: currView === view1 ? "#FFFFFF" : "transparent",
        }}
      >
        <TouchableOpacity onPress={onView1}>
          <View className="flex justify-center items-center py-2">
            <Text
              className={clsx(
                "font-bold  capitalize",
                fontSize ? fontSize : "text-base iphoneX:text-xl",
                currView === view1 ? "text-black" : "text-[#666F76]"
              )}
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              {view1}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        className={clsx("flex-1 rounded-md")}
        style={{
          backgroundColor: currView === view2 ? "#FFFFFF" : "transparent",
        }}
      >
        <TouchableOpacity onPress={onView2}>
          <View className="flex justify-center items-center py-2">
            <Text
              className={clsx(
                "font-bold  capitalize",
                fontSize ? fontSize : "text-base iphoneX:text-xl",
                currView === view2 ? "text-black" : "text-[#666F76]"
              )}
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              {view2}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewSelector;
