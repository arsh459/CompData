import { View, Text } from "react-native";
interface Props {
  title?: string;
}
const itemHeader: React.FC<Props> = ({ title }) => {
  return (
    <View className="pb-5">
      <Text
        className="text-center text-white/90 text-lg leading-tight tracking-tight"
        style={{ fontFamily: "Poppins-Medium" }}
      >
        {title ? title : "Check the items in the picture"}
      </Text>
    </View>
  );
};
export default itemHeader;
