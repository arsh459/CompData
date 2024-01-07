import { useAlgoliaStore } from "@hooks/algolia/useAlgoliaStore";
import { AlgoliaAppSearch } from "@models/AppSearch/interface";
import { FlashList } from "@shopify/flash-list";
import { shallow } from "zustand/shallow";
import CardForFilter from "./CardForFilter";
import { View } from "react-native";
import NoResult from "@modules/SearchMain/NoResult";
import PreviousSearches from "@modules/SearchMain/PreviousSearches";
import { noSearchResultIcon } from "@constants/imageKitURL";
import { noOfCol, paddingConst, reelCardHeight } from "./ReelCard";
import BlogWorkoutFlashlist from "./BlogWorkoutFlashlist";

interface Props {}

const ListComponent: React.FC<Props> = ({}) => {
  const { onNext, isQueryEmpty, isReelType, data, fetching } = useAlgoliaStore(
    (state) => {
      return {
        isQueryEmpty: state.query === "" ? true : false,
        onReset: state.onReset,
        onNext: state.onNext,
        data: state.data,
        fetching: state.action === "fetching" || state.action === "typing",
        isReelType:
          state.filter === "reel" || state.filter === "recipee" ? true : false,
      };
    },
    shallow
  );

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

  return isQueryEmpty ? (
    <PreviousSearches />
  ) : data?.length ? (
    <>
      {isReelType ? (
        <FlashList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={ItemSeparatorComponent}
          onEndReached={onNext}
          onEndReachedThreshold={0.4}
          bounces={false}
          className="flex-1"
          numColumns={noOfCol}
          key="reel"
          contentContainerStyle={{ paddingHorizontal: paddingConst }}
          estimatedItemSize={reelCardHeight}
        />
      ) : (
        <BlogWorkoutFlashlist />
      )}
    </>
  ) : !fetching ? (
    <NoResult icon={noSearchResultIcon} text="Sorry No Results" />
  ) : null;
};

export default ListComponent;
