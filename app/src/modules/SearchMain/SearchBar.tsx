import { View, Text, TextInput, TouchableOpacity } from "react-native";
import SvgIcons from "@components/SvgIcons";
import { useAlgoliaStore } from "@hooks/algolia/useAlgoliaStore";
import { useUserContext } from "@providers/user/UserProvider";
import { addToPreviousSearches } from "./utils";
import { useNavigation } from "@react-navigation/native";
import { shallow } from "zustand/shallow";

interface Props {}

const SearchBar: React.FC<Props> = ({}) => {
  const { user } = useUserContext();
  const navigation = useNavigation();

  const { query, onQueryChange, isClose } = useAlgoliaStore((state) => {
    return {
      query: state.query,
      onQueryChange: state.onQueryChange,
      isClose: state.action === "none" && state.query,
      // onInitAppSearch: state.onInitAppSearch,
    };
  }, shallow);

  const onClickSearch = async () => {
    if (query.trim() && !user?.previousSearches?.includes(query)) {
      await addToPreviousSearches(user?.uid, query);
    }
    if (isClose) {
      onQueryChange("", "appsearch");
    }
  };

  const onChangeText = (value: string) => {
    onQueryChange(value, "appsearch");
  };

  return (
    <View className="flex flex-row items-center justify-center px-4">
      <View className="flex-1 relative z-0 rounded-full mr-4">
        <TextInput
          className="w-full px-4 py-2 rounded-full text-white text-xs iphoneX:text-sm bg-[#343150]"
          defaultValue={query}
          onChangeText={onChangeText}
          placeholder="Search recipes, tips & reels"
          placeholderTextColor="#EAEAEA85"
          cursorColor={"#fff"}
          blurOnSubmit
          autoFocus
          // onBlur={onClickSearch}
        />

        <TouchableOpacity
          onPress={onClickSearch}
          className="absolute right-1 top-1 bottom-1 aspect-square rounded-full"
        >
          <View className="p-2 rounded-full  bg-[#6D55D1] border border-[#343150]">
            <SvgIcons iconType={isClose ? "closeIcon" : "search"} />
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text
          className="text-[#FF445E] text-xs iphoneX:text-sm"
          style={{ fontFamily: "Nunito-Medium" }}
        >
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
