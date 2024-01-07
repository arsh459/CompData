import GreenPlus from "@components/SvgIcons/GreenPlus";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { View, TouchableOpacity, Text } from "react-native";
const ItemAddButton = () => {
  const navigation = useNavigation();
  function navigateToAddItem() {
    navigation.navigate("AiScanItemAddScreen");
    weEventTrack("AiScanItemSelectScreen_addItem", {});
  }
  return (
    <TouchableOpacity
      className="px-8 flex flex-row items-center justify-center bg-[#F4753F]"
      onPress={navigateToAddItem}
    >
      <View className="w-3 aspect-[15/14] mr-1">
        <GreenPlus iconColor="#fff" />
      </View>
      <View>
        <Text
          className="text-white text-sm py-5"
          style={{ fontFamily: "Poppins-Medium" }}
        >
          Add an new item to list
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemAddButton;
