import clsx from "clsx";
import { Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface Props {
  text: string;
  classStr?: string;
  onPress?: () => void;
}

const SubscriptionLeft: React.FC<Props> = ({ text, classStr, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className={clsx(classStr ? classStr : "w-20 h-20 text-xs")}>
        <View className="w-full h-full relative z-0">
          <Svg className="w-full h-full" viewBox="0 0 74 74" fill="none">
            <Circle cx={37} cy={37} r={31} fill="#D34B5E" fillOpacity={0.8} />
            <Circle cx={37} cy={37} r={30.5} stroke="#FF556C" />
            <Circle cx={37} cy={37} r={33.5} stroke="#FF556C" />
            <Circle
              cx={37}
              cy={37}
              r={36.75}
              stroke="#FF556C"
              strokeWidth={0.5}
            />
          </Svg>
          <View className="absolute left-2.5 right-2.5 top-2.5 bottom-2.5 z-10 flex justify-center items-center">
            <Text className="text-white font-bold text-center">{text}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SubscriptionLeft;
