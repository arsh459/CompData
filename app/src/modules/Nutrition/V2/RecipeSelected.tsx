import { View, Text, useWindowDimensions } from "react-native";
import { Task } from "@models/Tasks/Task";
import useTaskReels from "@hooks/task/useTaskReels";
import ReelsCard from "@modules/Knowledge/ReelsCard";
import { FlashList } from "@shopify/flash-list";
import { useOnboardContext } from "@modules/Workout/GuidedOnboard/OnboardProvider";
import SearchCta from "@modules/SearchMain/SearchCta";

const cardAspectRatio = 1.5;

interface Props {}

const tags = ["Recipes"];

const RecipeSelected: React.FC<Props> = ({}) => {
  const { reelTasks: tasks, onNext } = useTaskReels(tags);
  const { width } = useWindowDimensions();
  const cardWidth = width / 2;
  const cardHeight = cardWidth * cardAspectRatio;
  const { reelCard, setReelProp } = useOnboardContext();

  function renderItem({ item, index }: { item: Task; index: number }) {
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
  }

  const keyExtractor = (item: Task) => item.id;

  return (
    <View className="flex-1">
      {tasks.length ? (
        <FlashList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReachedThreshold={0.4}
          onEndReached={onNext}
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
            No Recipe Found
          </Text>
        </View>
      )}
    </View>
  );
};

export default RecipeSelected;
