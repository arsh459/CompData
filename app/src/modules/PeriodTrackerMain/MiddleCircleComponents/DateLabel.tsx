import { Text } from "react-native";

interface Props {
  date: string;
}

const DateLabel: React.FC<Props> = ({ date }) => {
  return (
    <Text
      className="text-xs text-white text-center py-2 "
      style={{
        fontFamily: "Nunito-SemiBold",
      }}
    >
      {date}
    </Text>
  );
};

export default DateLabel;
