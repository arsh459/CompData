import MediaTile from "@components/MediaCard/MediaTile";
import { BenefitInterface } from "@models/Rounds/interface";
import { useWindowDimensions } from "react-native";
import { View, Text } from "react-native";

interface Props {
  item: BenefitInterface;
  index: number;
}

const HowToPlayCard: React.FC<Props> = ({ item, index }) => {
  const { width } = useWindowDimensions();

  // console.log("item", item.text, item.img.url, item.img.width, item.img.height);
  // const ar = 2748 / 2826;
  const cardWidth = width * 0.8;
  const cardHeight = width / 2.8; //width * ar;
  return (
    <View
      style={{ width: cardWidth, height: cardHeight }}
      className="flex bg-[#343150] flex-row rounded-xl items-center pl-4 overflow-hidden"
    >
      <View className="flex-1 pr-2 ">
        <Text className="text-white/60 text-xs">Step {index + 1}</Text>
        <Text className="text-white text-sm">{item.text}</Text>
      </View>
      <View className="flex-1 w-3/5 aspect-[2748/2826]  items-center justify-center">
        <MediaTile media={item.img} fluidResizeMode="cover" fluid={true} />
        {/* <MediaTile
          // mediaWidth={2748}
          mediaWidth={width * 0.8 * (2 / 3)}
          // maxHeight={2826}
          // fluid={true}
          media={item.img}
          // roundedStr={"object-bottom self-end"}
        /> */}
      </View>
    </View>
  );
};

export default HowToPlayCard;
