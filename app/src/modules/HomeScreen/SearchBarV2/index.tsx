import SvgIcons from "@components/SvgIcons";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

const SearchBarV2 = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("SearchScreens")}>
      <View className=" w-full h-10 rounded-xl bg-[#343150] flex flex-row items-center px-4">
        <View className=" w-5 h-5 mr-4 ">
          <SvgIcons iconType="search" />
        </View>
        <Text className=" text-base text-[#EAEAEA85]">
          Search “PCOS management tips”
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchBarV2;
