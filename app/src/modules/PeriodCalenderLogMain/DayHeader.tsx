import { Text } from "react-native";
import Header from "@modules/Header";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  title: string;
}

export const dayArr: string[] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

const DayHeader: React.FC<Props> = ({ title }) => {
  return (
    <>
      <Header
        title={title}
        back={true}
        tone="dark"
        gradientColors={["#FF6069", "#FF67A7"]}
      />
      <LinearGradient
        colors={["#FF6069", "#FF67A7"]}
        start={[0, 0]}
        end={[1, 0]}
        className="flex flex-row justify-around px-3 py-4"
      >
        {dayArr.map((item) => (
          <Text
            key={item}
            className="text-white text-xs"
            style={{ fontFamily: "Nunito-SemiBold" }}
          >
            {item}
          </Text>
        ))}
      </LinearGradient>
    </>
  );
};

export default DayHeader;
