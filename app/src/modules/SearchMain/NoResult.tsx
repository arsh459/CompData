import { View, Text } from "react-native";

import ImageWithURL from "@components/ImageWithURL";
interface Props {
  text?: string;
  icon?: string;
}
const SearchNoResult: React.FC<Props> = ({ icon, text }) => {
  return (
    <View className="flex-1 flex flex-row items-center justify-center">
      <View className="w-[12%]">
        {icon ? (
          <ImageWithURL
            source={{ uri: icon }}
            className="w-full aspect-square"
          />
        ) : null}
      </View>
      <Text
        className="text-white text-lg iphoneX:text-xl text-center w-2/6"
        style={{ fontFamily: "Nunito-Bold" }}
        numberOfLines={2}
      >
        {text}
      </Text>
    </View>
  );
};

export default SearchNoResult;
