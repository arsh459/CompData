import { View, Text } from "react-native";

import ImageWithURL from "@components/ImageWithURL";

interface Props {
  icon: string;
  text: string;
}
const ImgAndText: React.FC<Props> = ({ icon, text }) => (
  <View className="flex flex-row items-center pb-3">
    {icon ? (
      <ImageWithURL source={{ uri: icon }} className="w-4 aspect-square " />
    ) : null}
    <Text
      className="text-white/70 text-sm pl-1 "
      style={{ fontFamily: "Nunito-Regular" }}
    >
      {text}
    </Text>
  </View>
);

export default ImgAndText;
