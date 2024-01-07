import { View, ScrollView, TouchableOpacity } from "react-native";
import { taskTypesToFilterObj } from "@modules/SearchMain/utils";
import { algoliaType } from "@models/AppSearch/interface";
import { useAlgoliaStore } from "@hooks/algolia/useAlgoliaStore";
import { shallow } from "zustand/shallow";
import SearchTag from "./SearchTag";

interface Props {}

const SearchChip: React.FC<Props> = () => {
  const { onFilterChange } = useAlgoliaStore((state) => {
    return { filter: state.filter, onFilterChange: state.onFilterChange };
  }, shallow);

  return (
    <ScrollView
      horizontal={true}
      bounces={false}
      showsHorizontalScrollIndicator={false}
    >
      <View className="w-4" />
      {Object.keys(taskTypesToFilterObj).map((tag) => {
        // const isSelected = tag === filter;
        return (
          <TouchableOpacity
            key={tag}
            onPress={() => onFilterChange(tag as algoliaType)}
          >
            <SearchTag tag={tag} />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default SearchChip;
