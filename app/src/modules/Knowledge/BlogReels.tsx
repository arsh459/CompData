import useTaskReels from "@hooks/task/useTaskReels";
import { Task } from "@models/Tasks/Task";

import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import ReelsCard from "./ReelsCard";
import ReelsHeader from "./ReelsHeader";

const cardAspectRatio = 1.5;

interface Props {
  tabBarHeight: number;
}

const BlogReels: React.FC<Props> = ({ tabBarHeight }) => {
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const { reelTasks, onNext, loadingState } = useTaskReels(filterTags);

  const { width } = useWindowDimensions();
  const cardWidth = width / 2;
  const cardHeight = cardWidth * cardAspectRatio;

  const keyExtractor = (item: Task) => item.id;

  const renderItem = ({ item, index }: { item: Task; index: number }) => {
    const isEven = index % 2 === 0;
    return (
      <View
        style={{
          width: cardWidth,
          height: cardHeight,
          paddingLeft: isEven ? 16 : 8,
          paddingRight: isEven ? 8 : 16,
        }}
      >
        <ReelsCard item={item} />
      </View>
    );
  };

  const ListHeader = () => {
    return (
      <ReelsHeader filterTags={filterTags} setFilterTags={setFilterTags} />
    );
  };

  return (
    <View className="flex-1 bg-[#232136]">
      <FlashList
        data={reelTasks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.4}
        onEndReached={onNext}
        bounces={false}
        estimatedItemSize={cardHeight}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={
          <>
            {reelTasks.length ? null : (
              <View className="h-full flex justify-center items-center">
                <Text className="text-base text-white">
                  {loadingState === "PENDING" || loadingState === "LOADING"
                    ? "Fetching latest videos"
                    : loadingState === "FAILED"
                    ? "Something went wrong"
                    : ""}
                </Text>
              </View>
            )}
            <View style={{ height: tabBarHeight + 16 }} />
          </>
        }
        ItemSeparatorComponent={() => <View className="w-4 aspect-square" />}
        numColumns={2}
      />
    </View>
  );
};

export default BlogReels;
