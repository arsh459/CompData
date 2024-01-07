import { Text } from "react-native";

interface Props {
  dayText: string;
}

const DayText: React.FC<Props> = ({ dayText }) => {
  return (
    <Text
      className="text-white text-center text-3xl iphoneX:text-4xl"
      style={{
        fontFamily: "Nunito-Bold",
        lineHeight: 38,
      }}
    >
      {dayText}
    </Text>
  );
};

export default DayText;
