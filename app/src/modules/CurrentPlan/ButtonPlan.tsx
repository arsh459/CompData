import { View, Text } from "react-native";
interface Props {
  color: string;
  text?: string;
}
const ButtonPlan: React.FC<Props> = ({ color, text }) => {
  return (
    <View
      className=" flex-none border my-1.5 py-1.5 px-4 min-w-[120px] rounded-lg "
      style={color ? { borderColor: color } : {}}
    >
      <Text className="py-2 text-center" style={color ? { color } : {}}>
        {text ? text : ""}
      </Text>
    </View>
  );
};
export default ButtonPlan;
