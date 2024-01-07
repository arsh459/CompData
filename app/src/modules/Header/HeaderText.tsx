import { Text, View } from "react-native";

interface Props {
  text: string;
}

const HeaderText: React.FC<Props> = ({ text }) => {
  return (
    <View className="flex">
      <Text
        className="text-white text-2xl font-bold"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        {text}
      </Text>
    </View>
  );
};

export default HeaderText;
