import clsx from "clsx";

import { View } from "react-native";
interface Props {
  width: number;
  backGround: string;
  bgEmptyColor: string;
  height?: string;
  padding?: string;
  pill?: string;
}

const ProgressBarDynamic: React.FC<Props> = ({
  width,
  backGround,
  bgEmptyColor,
  height,
  padding,
  pill,
}) => {
  return (
    <View
      className={clsx(
        "rounded-full",
        height ? height : "h-2",
        padding ? padding : "p-px",
        pill && "pt-0 pb-0 pl-0"
      )}
      style={{ backgroundColor: bgEmptyColor }}
    >
      <View
        className="rounded-full h-full"
        style={{
          width: `${width}%`,
          backgroundColor: backGround,
        }}
      />
    </View>
  );
};

export default ProgressBarDynamic;
