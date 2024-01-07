import { View } from "react-native";
import SearchBar from "@modules/SearchMain/SearchBar";
import SearchChip from "@modules/SearchMain/SearchChip";
import ListComponent from "./ListComponent";
import LoadingComponent from "./LoadingComponent";

const SearchMain = () => {
  // useEffect(() => {
  //   return () => {
  //     onReset();
  //   };
  // }, []);

  return (
    <View className="flex-1 bg-[#232136]">
      <View>
        <SearchBar />
        <SearchChip />
        {/* {data.length || !!filter ? <SearchChip /> : null} */}
      </View>

      <View className="flex-1 relative z-0">
        <ListComponent />

        <LoadingComponent />
      </View>
    </View>
  );
};

export default SearchMain;
