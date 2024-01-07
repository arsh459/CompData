import { View, Text } from "react-native";

import ImgAndText from "./ImgAndText";
interface Props {
  heading?: string;
  middleText?: string;
  list?: {
    icon: string;
    text: string;
  }[];
}
const PauseOrAma: React.FC<Props> = ({ heading, list, middleText }) => {
  return (
    <View className="w-4/5 mx-auto">
      <Text
        className="text-white text-3xl leading-9 "
        style={{ fontFamily: "Nunito-Bold" }}
        numberOfLines={3}
      >
        {heading}
      </Text>

      <Text
        className="text-white/70 text-xs py-6"
        style={{ fontFamily: "Nunito-Regular" }}
      >
        {middleText}
      </Text>

      {list?.map((item) => (
        <ImgAndText icon={item.icon} text={item.text} key={item.icon} />
      ))}
    </View>
  );
};

export default PauseOrAma;
