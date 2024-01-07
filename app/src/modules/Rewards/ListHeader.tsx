import { Image, useWindowDimensions, View } from "react-native";
import { rewardScreenBg } from "@constants/imageKitURL";
import RewardBadge from "./RewardBadge";

interface Props {
  headerHeight: number;
}

const ListHeader: React.FC<Props> = ({ headerHeight }) => {
  const { width, height } = useWindowDimensions();

  return (
    <>
      <View className="relative flex-1">
        <Image
          source={{
            uri: rewardScreenBg,
          }}
          style={{
            width: width,
            height: height * (37 / 100),
          }}
        />

        <View
          className="absolute left-0 right-0 top-0 bottom-0 flex justify-center"
          style={{ paddingTop: headerHeight }}
        >
          <RewardBadge symbol="+" />
        </View>
      </View>
    </>
  );
};

export default ListHeader;
