import { View, Text } from "react-native";

interface Props {
  primaryString: string;
  secondaryString: string;
}
const SettingHeader: React.FC<Props> = ({ primaryString, secondaryString }) => (
  <View className="pl-4  ">
    <Text
      className="text-[#B4A1FF] text-base pt-2 "
      style={{ fontFamily: "Nunito-Bold" }}
    >
      {primaryString}
    </Text>
    <Text
      className="text-[#F1F1F1] text-xl iphoneX:text-2xl leading-none"
      style={{ fontFamily: "Nunito-Bold" }}
    >
      {secondaryString}
    </Text>
  </View>
);

export default SettingHeader;
