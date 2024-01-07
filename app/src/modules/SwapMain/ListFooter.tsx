import { useAlgoliaStore } from "@hooks/algolia/useAlgoliaStore";
import { View, Text } from "react-native";
import { shallow } from "zustand/shallow";

const ListFooter = () => {
  const { fetching, isQueryEmpty } = useAlgoliaStore(
    (state) => ({
      fetching: state.action === "fetching" || state.action === "typing",
      isQueryEmpty: state.query === "" ? true : false,
    }),
    shallow
  );
  return (
    <View className="flex flex-1 justify-center">
      {isQueryEmpty || fetching ? null : (
        <Text
          className="text-[13px] text-center text-[#FCB750] text-2xl p-6"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          No item as of now but you can add from below
        </Text>
      )}
    </View>
  );
};

export default ListFooter;
