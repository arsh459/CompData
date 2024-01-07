import { Text, ScrollView, TouchableOpacity, View } from "react-native";
import clsx from "clsx";
import SearchCta from "@modules/SearchMain/SearchCta";
import { useConfigContext } from "@providers/Config/ConfigProvider";

interface Props {
  filterTags: string[];
  setFilterTags: (val: string[]) => void;
}

const ReelsHeader: React.FC<Props> = ({ filterTags, setFilterTags }) => {
  const { config } = useConfigContext();

  return config?.tagTypes ? (
    <ScrollView
      horizontal={true}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      className="flex-1 flex flex-row mb-4"
    >
      <View className="w-4" />

      <SearchCta marginStr="mr-4" />

      {config?.tagTypes?.map((tag) => {
        const isSelected = filterTags.includes(tag);
        return (
          <TouchableOpacity
            key={tag}
            onPress={() =>
              setFilterTags(
                isSelected
                  ? filterTags.filter((each) => each !== tag)
                  : [...filterTags, tag]
              )
            }
            className={clsx(
              "rounded-full mr-4",
              isSelected ? "bg-[#5D588C]" : "bg-[#343150]"
            )}
          >
            <Text className={clsx("capitalize px-4 py-2", "text-white")}>
              {tag}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  ) : null;
};

export default ReelsHeader;
