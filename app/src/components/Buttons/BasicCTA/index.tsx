import clsx from "clsx";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  paddingStr?: string;
  color?: string;
  disableColor?: string;
  textColor?: string;
  roundStr?: string;
}

const BasicCTA: React.FC<Props> = ({
  text,
  onPress,
  disabled,
  paddingStr,
  color,
  disableColor,
  textColor,
  roundStr,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        className={clsx(
          disabled
            ? disableColor
              ? disableColor
              : "bg-stone-500 border-stone-200"
            : color
            ? color
            : "bg-[#FF556C] border-[#FF93A1]",
          paddingStr ? paddingStr : "px-4 py-2.5",
          roundStr ? roundStr : "rounded-lg",
          "border"
        )}
      >
        <Text
          className={clsx(
            textColor ? textColor : "text-white",
            "text-lg iphoneX:text-2xl text-center"
          )}
          style={{ fontFamily: "Nunito-Bold" }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BasicCTA;
