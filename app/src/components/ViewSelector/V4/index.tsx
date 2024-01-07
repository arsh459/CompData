import clsx from "clsx";
import { Text, View, TouchableOpacity, Image } from "react-native";

interface Props {
  view1: string;
  view2: string;
  view3?: string;
  currView: string;
  onView1: () => void;
  onView2: () => void;
  onView3?: () => void;
  margin?: string;
  fontSize?: string;
  view1IconUrl?: string;
  view2IconUrl?: string;
  view3IconUrl?: string;
  noThirdView?: boolean;
  bgColor?: string;
  selectedColor?: string;
  selectedTextColor?: string;
}

const ViewSelectorV4: React.FC<Props> = ({
  view1,
  view2,
  view3,
  currView,
  onView1,
  onView2,
  onView3,
  margin,
  fontSize,
  view1IconUrl,
  view2IconUrl,
  view3IconUrl,
  noThirdView,
  bgColor,
  selectedColor,
  selectedTextColor,
}) => {
  const uri1 = view1IconUrl ? view1IconUrl : undefined;
  const uri2 = view2IconUrl ? view2IconUrl : undefined;
  const uri3 = view3IconUrl ? view3IconUrl : undefined;

  const selectionColor = selectedColor ? selectedColor : "#5D588C";
  return (
    <View
      className={clsx(
        "flex flex-row items-center rounded-xl p-1",
        margin ? margin : "m-4"
      )}
      style={{ backgroundColor: bgColor ? bgColor : "#343150" }}
    >
      <View
        className="flex-1 rounded-lg"
        style={{
          backgroundColor: currView === view1 ? selectionColor : "transparent",
        }}
      >
        <TouchableOpacity onPress={onView1}>
          <View className="flex justify-center items-center py-2">
            <View className="flex flex-row items-center gap-1">
              {uri1 && (
                <Image
                  source={{ uri: uri1 }}
                  className="w-3 aspect-square"
                  resizeMode="contain"
                />
              )}
              <Text
                className={clsx(
                  "capitalize",
                  fontSize ? fontSize : "text-xs iphoneX:text-sm text-white"
                )}
                style={{
                  fontFamily: "Nunito-SemiBold",
                  color:
                    selectedTextColor && currView === view1
                      ? selectedTextColor
                      : "#fff",
                }}
              >
                {view1}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View
        className="flex-1 rounded-lg"
        style={{
          backgroundColor: currView === view2 ? selectionColor : "transparent",
        }}
      >
        <TouchableOpacity onPress={onView2}>
          <View className="flex justify-center items-center py-2">
            <View className="flex flex-row items-center gap-1">
              {uri2 && (
                <Image
                  source={{ uri: uri2 }}
                  className="w-3 aspect-square"
                  resizeMode="contain"
                />
              )}
              <Text
                className={clsx(
                  "capitalize",
                  fontSize ? fontSize : "text-xs iphoneX:text-sm text-white"
                )}
                style={{
                  fontFamily: "Nunito-SemiBold",
                  color:
                    selectedTextColor && currView === view2
                      ? selectedTextColor
                      : "#fff",
                }}
              >
                {view2}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {noThirdView ? null : (
        <View
          className="flex-1 rounded-lg"
          style={{
            backgroundColor:
              currView === view3 ? selectionColor : "transparent",
          }}
        >
          <TouchableOpacity onPress={onView3}>
            <View className="flex justify-center items-center py-2">
              <View className="flex flex-row items-center gap-1">
                {uri3 && (
                  <Image
                    source={{ uri: uri3 }}
                    className="w-3 aspect-square"
                    resizeMode="contain"
                  />
                )}
                <Text
                  className={clsx(
                    "capitalize",
                    fontSize ? fontSize : "text-xs iphoneX:text-sm text-white"
                  )}
                  style={{
                    fontFamily: "Nunito-SemiBold",
                    color:
                      selectedTextColor && currView === view3
                        ? selectedTextColor
                        : "#fff",
                  }}
                >
                  {view3}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ViewSelectorV4;
