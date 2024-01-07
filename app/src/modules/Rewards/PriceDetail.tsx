import { View, Text } from "react-native";

interface Props {
  value?: string;
  valueText?: string;
}
const PriceDetail: React.FC<Props> = ({ value, valueText }) => {
  return (
    <View className="flex-1 flex-row items-center px-4">
      <Text className="text-white px-4">=</Text>
      <View className="flex mx-4">
        <Text
          className="text-[#FF5E74] text-lg iphoneX:text-2xl "
          style={{ fontFamily: "BaiJamjuree-Bold" }}
          adjustsFontSizeToFit={true}
        >
          {value}
        </Text>
        <Text
          className="text-white  text-xs iphoneX:text-sm"
          style={{ fontFamily: "BaiJamjuree" }}
        >
          {valueText}
        </Text>
      </View>
    </View>
  );
};

export default PriceDetail;
