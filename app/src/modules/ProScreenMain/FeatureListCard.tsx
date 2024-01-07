import { View, Text, useWindowDimensions } from "react-native";

import { ListCard } from "./utils";
import ImageWithURL from "@components/ImageWithURL";
import clsx from "clsx";
interface Props {
  featureList: ListCard;
  isLast: boolean;
  rounded?: boolean;
  borderStr?: string;
}
const FeatureListCard: React.FC<Props> = ({
  featureList,
  isLast,
  rounded,
  borderStr,
}) => {
  const { width } = useWindowDimensions();
  return (
    <View className="flex-1">
      <View className="flex flex-row justify-between items-center">
        <View
          style={{ width: width * 0.15, aspectRatio: 1 }}
          className={rounded ? "rounded-full overflow-hidden" : undefined}
        >
          <ImageWithURL
            source={{
              uri: featureList?.iconUri,
            }}
            className="w-full h-fyll"
          />
        </View>
        <View className="flex-1 pl-4">
          <Text
            className="text-sm iphoneX:text-base text-white"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {featureList.heading}
          </Text>
          <Text
            className="text-xs iphoneX:text-sm text-white/60"
            style={{ fontFamily: "Nunito-Medium" }}
          >
            {featureList.mainText}
          </Text>
        </View>
      </View>
      <View
        className={clsx(
          " w-full bg-[#FFFFFF36] ",
          !isLast ? (borderStr ? borderStr : "my-7 h-px") : ""
        )}
      />
    </View>
  );
};

export default FeatureListCard;
