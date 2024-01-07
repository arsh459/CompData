import { ListCard } from "@modules/ProScreenMain/utils";
import { View, Text, Image } from "react-native";

interface Props {
  featureList: ListCard;
}

const FeatureListCard: React.FC<Props> = ({ featureList }) => {
  return (
    <View className="flex-1 px-2 py-4 border-t border-white/20 mx-2">
      <View className="flex flex-row items-center">
        <Image
          source={{
            uri: featureList?.iconUri,
          }}
          className="w-10 aspect-square"
        />
        <Text
          className="flex-1 px-4 text-sm iphoneX:text-base text-white"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {featureList.heading}
        </Text>
        <Image
          source={{
            uri: "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/Group_1080_jbLGpOTbL.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674224752108",
          }}
          className="w-4 aspect-square"
        />
      </View>
    </View>
  );
};

export default FeatureListCard;
