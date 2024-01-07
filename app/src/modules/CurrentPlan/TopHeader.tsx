import { View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { backIconCurrentSubscription } from "@constants/imageKitURL";

interface Props {
  headerText?: string;
  headerBackIcon?: string;
}

const TopHeader: React.FC<Props> = ({ headerBackIcon, headerText }) => {
  const navigation = useNavigation();

  return (
    <View className="flex flex-row items-center">
      <Pressable onPress={navigation.goBack}>
        <Image
          source={{
            uri: headerBackIcon ? headerBackIcon : backIconCurrentSubscription,
          }}
          className="w-2 h-4 iphoneX:w-3 iphoneX:h-7 cursor-pointer"
        />
      </Pressable>

      <Text className="flex-1 pl-4 text-white  text-xl iphoneX:text-[26px] font-semibold ">
        {headerText}
      </Text>
    </View>
  );
};
export default TopHeader;
