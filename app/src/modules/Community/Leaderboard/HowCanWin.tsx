import { View, Text } from "react-native";
import { useSprintDetailContext } from "@providers/SprintDetail/SprintDetailProvider";
import { ListItemContent } from "@models/SprintDetails/SprintDetail";
import MediaTile from "@components/MediaCard/MediaTile";

const HowCanWin = () => {
  const { sprintDetail } = useSprintDetailContext();

  return (
    <View className="flex-1 px-4">
      <Text
        className="text-[#F1F1F1] text-center py-12 iphoneX:py-16 text-xl iphoneX:text-2xl"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        How can you win?
      </Text>
      {sprintDetail?.howToWin.map((item, index) => {
        return (
          <View key={`${item.text}-${index}`}>
            <ListItemComponent {...item} />
          </View>
        );
      })}
    </View>
  );
};

export default HowCanWin;

const ListItemComponent: React.FC<ListItemContent> = ({ image, text }) => {
  return (
    <View className="p-4 rounded-3xl bg-[#262630] m-2">
      <View className="flex-1 aspect-[239/75]">
        <MediaTile media={image} fluid={true} />
      </View>
      {text ? (
        <View className="pt-3">
          <Text
            className=" text-[#D8D8D8] text-xs iphoneX:text-sm w-4/5 text-center mx-auto"
            style={{ fontFamily: "BaiJamjuree-Regular" }}
          >
            {text}
          </Text>
        </View>
      ) : null}
    </View>
  );
};
