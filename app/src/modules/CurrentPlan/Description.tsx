import { Text, View } from "react-native";
interface Props {
  description?: string[];
  // currency: string;
  // cost: number;
}
const Description: React.FC<Props> = ({ description }) => {
  return (
    <View>
      {description
        ? description.map((item) => {
            return (
              <View key={item}>
                <Text className="font-medium text-base iphoneX:text-lg text-[#F5F5F7]  ">
                  {item}
                </Text>
              </View>
            );
          })
        : null}
    </View>
  );
};
export default Description;
