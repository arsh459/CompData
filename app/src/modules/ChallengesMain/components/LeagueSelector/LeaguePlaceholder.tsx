import ImageWithURL from "@components/ImageWithURL";
import MarqueeButton from "@components/MarqueeButton";
import { useUserStore } from "@providers/user/store/useUserStore";
import clsx from "clsx";

import { View, Text } from "react-native";

interface Props {
  onCTA: () => void;
}

const LeaguePlaceholder: React.FC<Props> = ({ onCTA }) => {
  const viewState = useUserStore((state) => {
    const userLevel = state.user?.userLevelV2 ? state.user?.userLevelV2 : 1;
    const selectedlvlNum = Number(state.selectedLevelNumString);
    if (selectedlvlNum === userLevel) {
      return "NONE";
    } else if (selectedlvlNum > userLevel) {
      return "LOCKED";
    } else {
      return "COMPLETED";
    }
  });

  return (
    <>
      {viewState === "NONE" ? null : viewState === "COMPLETED" ? (
        <View className="flex-1 justify-center ">
          <View className="flex items-center justify-center">
            <View className="w-[130px] h-[154px]">
              <ImageWithURL
                source={{
                  uri: "https://ik.imagekit.io/socialboat/Group%201000001256_zIIDRiY60.png?updatedAt=1697015179679",
                }}
                className="w-full h-full"
                resizeMode="contain"
              />
            </View>
          </View>
          <View className="px-24 flex items-center justify-center mt-5">
            <View className=" flex items-center justify-center">
              <Text
                className="text-[#B394C9] text-center text-sm"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                You have completed this league. Go to your league to see your
                progress
              </Text>
            </View>
          </View>
          <View className="px-12 mt-20">
            <MarqueeButton
              onPress={onCTA}
              text={"View my league"}
              textStyleTw="text-white text-base"
              containerStyleTw={clsx("bg-[#6D55D1] w-full py-4", "")}
            />
          </View>
        </View>
      ) : (
        <View className="flex-1 justify-center">
          <View className="flex items-center justify-center">
            <View className="w-[130px] h-[154px]">
              <ImageWithURL
                source={{
                  uri: "https://ik.imagekit.io/socialboat/Group%201000001256_zIIDRiY60.png?updatedAt=1697015179679",
                }}
                className="w-full h-full"
                resizeMode="contain"
              />
            </View>
          </View>
          <View className="px-24 flex items-center justify-center mt-5">
            <View className=" flex items-center justify-center">
              <Text
                className="text-[#B394C9] text-center text-sm"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                This league is locked stay in promotion zone to progress to this
                league
              </Text>
            </View>
          </View>
          <View className="px-16 mt-20">
            <MarqueeButton
              onPress={onCTA}
              text={"View my league"}
              textStyleTw="text-white text-base"
              containerStyleTw={clsx("bg-[#6D55D1] w-full py-4", "")}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default LeaguePlaceholder;
