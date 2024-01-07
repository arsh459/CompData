import {
  dietIconWhiteFrame14,
  recipeIconWhiteFrame14,
} from "@constants/imageKitURL";
import clsx from "clsx";
import { Text, View, TouchableOpacity, Image } from "react-native";

interface Props {
  view1: string;
  view2: string;
  currView: string;
  onView1: () => void;
  onView2: () => void;
  margin?: string;
  fontSize?: string;
  view1IconUrl?: string;
  view2IconUrl?: string;
  noIcon?: boolean;
}

const ViewSelectorV2: React.FC<Props> = ({
  view1,
  view2,
  currView,
  onView1,
  onView2,
  margin,
  fontSize,
  view1IconUrl,
  view2IconUrl,
  noIcon,
}) => {
  const uri1 = view1IconUrl ? view1IconUrl : dietIconWhiteFrame14;
  const uri2 = view2IconUrl ? view2IconUrl : recipeIconWhiteFrame14;
  return (
    <View
      className={clsx(
        "flex flex-row items-center  bg-[#343150] rounded-xl p-1",
        margin ? margin : "m-4"
      )}
    >
      <View
        className="flex-1 rounded-lg"
        style={{
          backgroundColor: currView === view1 ? "#5D588C" : "transparent",
        }}
      >
        <TouchableOpacity onPress={onView1}>
          <View className="flex justify-center items-center py-2">
            <View className="flex flex-row items-center gap-1">
              {noIcon ? null : (
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
                style={{ fontFamily: "Nunito-SemiBold" }}
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
          backgroundColor: currView === view2 ? "#5D588C" : "transparent",
        }}
      >
        <TouchableOpacity onPress={onView2}>
          <View className="flex justify-center items-center py-2">
            <View className="flex flex-row items-center gap-1">
              {noIcon ? null : (
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
                style={{ fontFamily: "Nunito-SemiBold" }}
              >
                {view2}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewSelectorV2;
