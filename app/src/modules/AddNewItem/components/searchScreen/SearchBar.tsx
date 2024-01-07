import useAddNewItem from "@providers/AddNewItem/useAddNewItem";
import { View, Text, TextInput } from "react-native";
import { shallow } from "zustand/shallow";
const SearchBar = () => {
  const { queryItem, setQueryItem } = useAddNewItem(
    (state) => ({
      queryItem: state.queryItem,
      setQueryItem: state.setQueryItem,
    }),
    shallow
  );
  return (
    <View className=" flex-1 px-4">
      <Text
        className="text-white px-4 text-lg pb-7"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        What would you like to add?
      </Text>

      <View className="px-3 pb-4">
        <TextInput
          className="w-full px-4 py-4 rounded-lg text-white text-sm bg-[#343150]"
          value={queryItem}
          onChangeText={setQueryItem}
          placeholder="Type meal name"
          placeholderTextColor="#EAEAEA85"
          cursorColor={"#fff"}
          blurOnSubmit
          autoFocus
          style={{ fontFamily: "Nunito-SemiBold" }}
        />
      </View>
      <View className="px-4">
        <Text
          className="text-[#f1f1f159] px-4 text-xs"
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          For example : Kadhai Paneer with Butter Roti
        </Text>
      </View>
    </View>
  );
};
export default SearchBar;
