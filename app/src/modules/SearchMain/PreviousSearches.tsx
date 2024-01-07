import { Text, TouchableOpacity, View } from "react-native";
import TextBetween from "@components/TextBetween/TextBetween";
import { arrowPushSearchIcon } from "@constants/imageKitURL";
import { FlashList } from "@shopify/flash-list";
import { useUserContext } from "@providers/user/UserProvider";
import { useAlgoliaStore } from "@hooks/algolia/useAlgoliaStore";
import { useConfigContext } from "@providers/Config/ConfigProvider";
import { shallow } from "zustand/shallow";

interface Props {}

const SearchResultPushToInput: React.FC<Props> = ({}) => {
  const { user } = useUserContext();
  // const { selectedEvent: game } = useSelectedEvent(state.gameId);
  const { config } = useConfigContext();

  const previousSearches = user?.previousSearches ? user?.previousSearches : [];
  const popularSearches = config?.popularSearches ? config.popularSearches : [];

  const searches = [...previousSearches, ...popularSearches];

  const onQueryChange = useAlgoliaStore(
    (state) => state.onQueryChange,
    shallow
  );

  const keyExtractor = (item: string, index: number) => `${item}_${index}`;

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <TouchableOpacity onPress={() => onQueryChange(item, "appsearch")}>
        {index !== 0 ? (
          <View className="h-px bg-[#FFFFFF26] w-full mx-4" />
        ) : null}
        <TextBetween
          imgStr={arrowPushSearchIcon}
          textLeft={item}
          containerStyle="px-4"
          textLeftStyle="w-2/5 text-white text-base"
          fontFamily="Nunito-Light"
        />
      </TouchableOpacity>
    );
  };

  return (
    <FlashList
      className="flex-1"
      data={searches}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      bounces={false}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <Text
          className="text-[#F1F1F1] capitalize text-sm iphoneX:text-base p-4 pb-2 bg-[#232136]"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          {`${previousSearches?.length ? "Recent" : "Popular"} Searches`}
        </Text>
      }
      // stickyHeaderIndices={[0]}
      estimatedItemSize={50}
    />
  );
};

export default SearchResultPushToInput;
