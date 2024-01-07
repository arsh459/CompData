import { filtersType } from "@hooks/ghost/useGhostPosts";
import SearchCta from "@modules/SearchMain/SearchCta";
import clsx from "clsx";
import {
  // Image,
  ScrollView,
  Text,
  // TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  searchStr?: string;
  searchTags: string[];
  searchAuthors: string[];
  setSearchStr: (val: string) => void;
  setSearchTags: (val: string[]) => void;
  setSearchAuthors: (val: string[]) => void;
  filters: filtersType;
}

const KnowledgeHeader: React.FC<Props> = ({
  searchStr,
  searchTags,
  searchAuthors,
  setSearchStr,
  setSearchTags,
  setSearchAuthors,
  filters,
}) => {
  // let filterTimeout: NodeJS.Timeout;

  // const onChange = (text: string) => {
  //   clearTimeout(filterTimeout);

  //   filterTimeout = setTimeout(() => {
  //     setSearchStr(text);
  //   }, 1000);
  // };

  // const onClear = () => {
  //   setSearchStr("");
  //   setSearchTags([]);
  //   setSearchAuthors([]);
  // };

  return (
    <View className="flex-1 flex">
      {/* <View className="flex flex-row items-center p-4">
        <View className="bg-white/10 flex-1 rounded-full overflow-hidden flex flex-row items-center px-3 py-2">
          <Image
            source={{
              uri: "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/Vector_m20_CD2aa.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675323079073",
            }}
            className="w-4 aspect-square"
            resizeMode="contain"
          />
          <View className="w-3 aspect-square" />
          <TextInput
            className="flex-1 text-white text-xl"
            onChangeText={onChange}
            blurOnSubmit
            placeholder="Search"
            placeholderTextColor="#FFFFFF80"
            defaultValue={searchStr}
          />
        </View>
        <TouchableOpacity onPress={onClear} className="ml-4">
          <Image
            source={{
              uri: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Component_86__1__6P9FGne8p.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675344007631",
            }}
            className="w-8 aspect-square"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View> */}
      {Object.keys(filters.tags).length ? (
        <ScrollView
          horizontal={true}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          className="flex-1 flex flex-row"
        >
          <View className="w-4" />

          <SearchCta marginStr="mr-4" />

          {Object.keys(filters.tags).map((tag) => {
            const isSelected = searchTags.includes(tag);
            return (
              <TouchableOpacity
                key={tag}
                onPress={() =>
                  setSearchTags(
                    isSelected
                      ? searchTags.filter((each) => each !== tag)
                      : [...searchTags, tag]
                  )
                }
                className={clsx(
                  "rounded-full mr-4",
                  isSelected ? "bg-[#5D588C]" : "bg-[#343150]"
                )}
              >
                <Text className={clsx("capitalize px-4 py-2", "text-white")}>
                  {filters.tags[tag]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : null}

      {/* {Object.keys(filters.authors).length ? (
        <ScrollView
          horizontal={true}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          className="flex-1 flex flex-row mt-4"
        >
          <View className="w-4" />
          {Object.keys(filters.authors).map((author) => {
            const isSelected = searchAuthors.includes(author);
            return (
              <TouchableOpacity
                key={author}
                onPress={() =>
                  setSearchAuthors(
                    isSelected
                      ? searchAuthors.filter((each) => each !== author)
                      : [...searchAuthors, author]
                  )
                }
                className={clsx(
                  "border border-white rounded-full mr-4",
                  isSelected && "bg-white"
                )}
              >
                <Text
                  className={clsx(
                    "capitalize px-4 py-1",
                    isSelected ? "text-[#585858]" : "text-white"
                  )}
                >
                  {filters.authors[author]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : null} */}
      <View className="w-4 aspect-square" />
    </View>
  );
};

export default KnowledgeHeader;
