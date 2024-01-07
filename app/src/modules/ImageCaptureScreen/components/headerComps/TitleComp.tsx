import { View, Text } from "react-native";

interface Props {
  title: string;
}
const TitleComp: React.FC<Props> = ({ title }) => {
  return (
    <View>
      <Text
        className="text-center text-white/90 text-base leading-[1.25rem] tracking-tight"
        style={{ fontFamily: "Poppins-SemiBold" }}
      >
        Meal Scan
      </Text>
    </View>
  );
};
export default TitleComp;
