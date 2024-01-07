import { View, TextInput } from "react-native";
import { useAlgoliaStore } from "@hooks/algolia/useAlgoliaStore";
import { shallow } from "zustand/shallow";
import { MealTypes } from "@models/Tasks/Task";

interface Props {
  meal?: MealTypes;
}

const SearchBarSwap: React.FC<Props> = ({ meal }) => {
  const { query, onQueryChange } = useAlgoliaStore(
    (state) => ({
      query: state.query,
      onQueryChange: state.onQueryChange,
    }),
    shallow
  );

  const onChangeText = (val: string) => {
    onQueryChange(val, "dietsearch", meal ? meal : "Breakfast");
  };

  return (
    <View className="flex flex-row items-center justify-center mx-0 rounded-lg">
      <TextInput
        className="w-full px-4 py-4 rounded-lg text-white text-sm bg-[#343150]"
        value={query}
        onChangeText={onChangeText}
        placeholder="Type meal name"
        placeholderTextColor="#EAEAEA85"
        cursorColor={"#fff"}
        blurOnSubmit
        autoFocus={false}
        style={{ fontFamily: "Nunito-SemiBold" }}
      />
    </View>
  );
};

export default SearchBarSwap;
