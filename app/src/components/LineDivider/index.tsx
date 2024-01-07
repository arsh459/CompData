import clsx from "clsx";
import { View, Text } from "react-native";

interface Props {
  text?: string;
  color?: string;
  fontSize?: string;
  line?: "before" | "after";
  clsStr?: string;
}

const LineDivider: React.FC<Props> = ({
  text,
  color,
  fontSize,
  line,
  clsStr,
}) => {
  return (
    <View className={clsx("flex flex-row items-center", clsStr)}>
      {line === "after" ? null : (
        <View
          className="flex-1 h-px"
          style={{ backgroundColor: color ? color : "#000000" }}
        />
      )}
      <Text
        className={clsx(fontSize, "capitalize px-4")}
        style={{ color: color ? color : "#000000" }}
      >
        {text ? text : "Or"}
      </Text>
      {line === "before" ? null : (
        <View
          className="flex-1 h-px"
          style={{ backgroundColor: color ? color : "#000000" }}
        />
      )}
    </View>
  );
};

export default LineDivider;
