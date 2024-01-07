import { View, Text } from "react-native";

interface Props {
  width?: number;
  height?: number;
  text?: string;
}

const EndOfTheList: React.FC<Props> = ({ text, width, height }) => {
  return (
    <View
      style={{ width, height: height }}
      className="flex justify-center items-center mx-auto"
    >
      <Text
        className="text-white text-lg iphoneX:text-xl"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        -- {text ? text : "End of the list"} --
      </Text>
    </View>
  );
};

export default EndOfTheList;
