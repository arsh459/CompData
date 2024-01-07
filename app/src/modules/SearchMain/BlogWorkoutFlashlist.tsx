import { useAlgoliaStore } from "@hooks/algolia/useAlgoliaStore";
import { AlgoliaAppSearch } from "@models/AppSearch/interface";
import { FlashList } from "@shopify/flash-list";
import { shallow } from "zustand/shallow";
import CardForFilter from "./CardForFilter";
import { View } from "react-native";
import { blogCardHeight } from "./BlogCard";
import { taskCardHeight } from "./TaskCard";
import { resultCardHeight } from "./ResultCard";

interface Props {}

const BlogWorkoutFlashlist: React.FC<Props> = ({}) => {
  const { onNext, filter, data } = useAlgoliaStore((state) => {
    return {
      filter: state.filter,
      data: state.data,
      onNext: state.onNext,
    };
  }, shallow);

  const renderItem = ({
    item,
    index,
  }: {
    item: AlgoliaAppSearch;
    index: number;
  }) => <CardForFilter item={item} index={index} />;

  const keyExtractor = (item: AlgoliaAppSearch, index: number) =>
    `${item.objectID}-${index}`;

  const ItemSeparatorComponent = () => <View className="w-4 aspect-square" />;

  //   console.log("data here", data.length);
  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={ItemSeparatorComponent}
      onEndReached={onNext}
      onEndReachedThreshold={0.4}
      bounces={false}
      className="flex-1"
      estimatedItemSize={
        filter === "blog"
          ? blogCardHeight
          : filter === "workout"
          ? taskCardHeight
          : resultCardHeight
      }
    />
  );
};

export default BlogWorkoutFlashlist;
