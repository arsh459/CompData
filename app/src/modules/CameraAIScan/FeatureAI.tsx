import { View, Text, Image, useWindowDimensions } from "react-native";

import clsx from "clsx";
interface Props {
  imgUrl?: string;
  text?: string;
  arrSize: number;
  dataFor?: "workout" | "nutrition";
}
const FeatureAI: React.FC<Props> = ({ imgUrl, text, arrSize, dataFor }) => {
  const { width: Width } = useWindowDimensions();
  arrSize = arrSize > 2 ? 1 / 4 : 1 / 3;
  const itemWidth = Width * arrSize;
  return (
    <View className="flex">
      <View
        className={"p-4  rounded-lg bg-[#373747] aspect-[95/90]"}
        style={{ width: itemWidth }}
      >
        <Image
          className={clsx(
            dataFor === "nutrition" ? "mx-2 aspect-square" : "aspect-square"
          )}
          source={{ uri: imgUrl }}
        />
      </View>
      <Text
        className="text-xs mt-2  text-[#FFFFFFCC]  "
        style={{ fontFamily: "BaiJamjuree-Regular" }}
      >
        {text}
      </Text>
    </View>
  );
};

export default FeatureAI;
