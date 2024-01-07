import { View, Text, useWindowDimensions } from "react-native";
import { Task } from "@models/Tasks/Task";
import { useReelTasks } from "@hooks/program/useReelTasks";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { FlashList } from "@shopify/flash-list";
import ReelsCard from "@modules/Knowledge/ReelsCard";
import { useOnboardContext } from "@modules/Workout/GuidedOnboard/OnboardProvider";
import SearchCta from "@modules/SearchMain/SearchCta";

const cardAspectRatio = 1.5;

interface Props {}

const IntroReels: React.FC<Props> = ({}) => {
  const { badge } = useSignleBadgeContext();
  const { tasks, loading } = useReelTasks(badge?.id);
  const { width } = useWindowDimensions();
  const cardWidth = width / 2;
  const cardHeight = cardWidth * cardAspectRatio;
  const { reelCard, setReelProp } = useOnboardContext();

  const renderItem = ({ item, index }: { item: Task; index: number }) => {
    const isEven = index % 2 === 0;
    const props =
      index === 0
        ? {
            ref: reelCard,
            collapsable: false,
            onLayout: () => setReelProp(item),
          }
        : {};

    return (
      <View
        style={{
          width: cardWidth,
          height: cardHeight,
          paddingLeft: isEven ? 16 : 8,
          paddingRight: isEven ? 8 : 16,
        }}
      >
        <View {...props}>
          <ReelsCard item={item} />
        </View>
      </View>
    );
  };

  const keyExtractor = (item: Task) => item.id;

  return (
    <View className="flex-1">
      {tasks.length ? (
        <FlashList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          bounces={false}
          estimatedItemSize={cardHeight}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<SearchCta marginStr="mx-4 mb-4" />}
          ItemSeparatorComponent={() => <View className="w-4 aspect-square" />}
          contentContainerStyle={{ paddingVertical: 16 }}
          numColumns={2}
        />
      ) : (
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-3xl text-white text-center font-bold">
            {loading === "FAILED"
              ? "Something went wrong, try in a minute"
              : loading === "LOADING"
              ? "Fetching latest reels"
              : loading === "PENDING"
              ? "Fetching latest reels"
              : "No Reels as of now"}
          </Text>
        </View>
      )}
    </View>
  );
};

export default IntroReels;
