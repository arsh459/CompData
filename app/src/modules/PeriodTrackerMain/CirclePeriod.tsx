import { View } from "react-native";
import CircleMiddleData from "./CircleMiddleData";
import CircleDashed from "./CircleDashed";

interface Props {}

const CirclePeriod: React.FC<Props> = ({}) => {
  return (
    <View className="flex items-center justify-center relative z-0  ">
      <View className="" style={{}}>
        <CircleDashed />
      </View>
      <CircleMiddleData />
    </View>
  );
};

export default CirclePeriod;
