import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { FlatList, Text, useWindowDimensions, View } from "react-native";
import CoachAboutCard from "./CoachAboutCard";

const AboutMyCoaches = () => {
  const { width } = useWindowDimensions();

  const { badge } = useSignleBadgeContext();

  const renderItem = ({ item }: { item: string }) => {
    return (
      <CoachAboutCard
        uid={item}
        width={
          badge?.creatorIds && badge.creatorIds.length > 1
            ? width * 0.9
            : width - 32
        }
      />
    );
  };

  const keyExtractor = (item: string) => item;

  return badge?.creatorIds ? (
    <>
      <Text
        className="text-[#F1F1F1] capitalize text-lg iphoneX:text-xl p-4 pb-2"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        Designed by the best
      </Text>
      <FlatList
        data={badge?.creatorIds}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal={true}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={<View className="w-4 aspect-square" />}
        ListFooterComponent={<View className="w-4 aspect-square" />}
        ItemSeparatorComponent={() => <View className="w-4 aspect-square" />}
      />
    </>
  ) : null;
};

export default AboutMyCoaches;
