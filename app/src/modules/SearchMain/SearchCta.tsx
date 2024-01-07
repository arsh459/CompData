import SvgIcons from "@components/SvgIcons";
import { useNavigation } from "@react-navigation/native";
import clsx from "clsx";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  marginStr?: string;
}

const SearchCta: React.FC<Props> = ({ marginStr }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("SearchScreens")}
      className={clsx(
        "flex-1 relative z-0 bg-[#343150] rounded-full flex flex-row items-center px-4 py-2",
        marginStr
      )}
    >
      <View className="w-4 aspect-square mr-2">
        <SvgIcons iconType="search" />
      </View>

      <Text className="flex-1 text-[#EAEAEA85] text-sm mr-8">Search</Text>
    </TouchableOpacity>
  );
};

export default SearchCta;
