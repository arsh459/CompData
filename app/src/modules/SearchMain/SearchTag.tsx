import { View, Text } from "react-native";
import clsx from "clsx";
import { useAlgoliaStore } from "@hooks/algolia/useAlgoliaStore";
import { shallow } from "zustand/shallow";
import { algoliaMatch, algoliaType } from "@models/AppSearch/interface";

interface Props {
  tag: string;
}

const SearchTag: React.FC<Props> = ({ tag }) => {
  const { isSelected } = useAlgoliaStore((state) => {
    return { isSelected: state.filter === tag };
  }, shallow);

  const viewTagSpelling = algoliaMatch[tag as algoliaType];

  return (
    <View
      className={clsx(
        "rounded-full mr-4 my-4",
        isSelected ? "bg-[#5D588C]" : "bg-[#343150]"
      )}
    >
      <Text className="capitalize px-6 py-2 text-xs iphoneX:text-sm text-white">
        {viewTagSpelling}
      </Text>
    </View>
  );
};

export default SearchTag;
