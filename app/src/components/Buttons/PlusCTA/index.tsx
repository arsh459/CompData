import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import clsx from "clsx";

interface Props {
  onPress?: () => void;
  text?: string;
  roundStr?: string;
  colors?: string[];
  fontStyle?: string;
}

const PlusCTA: React.FC<Props> = ({
  onPress,
  text,
  roundStr,
  colors,
  fontStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={colors ? colors : ["#FD6F6F", "#F19B38"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        className={clsx(
          roundStr ? roundStr : "rounded-xl",
          "flex flex-row justify-center items-center py-2.5 px-4"
        )}
      >
        <Text
          className={clsx(
            fontStyle ? fontStyle : "text-white text-lg iphoneX:text-3xl",
            "text-center"
          )}
        >
          +
        </Text>
        <Text
          className={clsx(
            fontStyle ? fontStyle : "text-white text-sm iphoneX:text-xl",
            "text-center capitalize pl-4"
          )}
        >
          {text ? text : "ADD"}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PlusCTA;
