import { View, Text } from "react-native";

interface Props {
  date?: string;
}

const CustomHeaderForCalendar: React.FC<Props> = ({ date }) => {
  if (date) {
    // const header = date.toString("MMMM");

    return (
      <View className="flex-1">
        <Text
          className="text-left text-white text-xl"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          {date}
        </Text>
      </View>
    );
  } else {
    return <View />;
  }
};

export default CustomHeaderForCalendar;
