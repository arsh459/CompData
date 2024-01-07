import { Text } from "react-native";

interface Props {
  topText: string;
}

const TopLabelText: React.FC<Props> = ({ topText }) => {
  return (
    <Text
      className="text-white text-center iphoneX:text-lg"
      style={{
        fontFamily: "Nunito-SemiBold",
        lineHeight: 20,
      }}
    >
      {topText}
    </Text>
  );
};

export default TopLabelText;
