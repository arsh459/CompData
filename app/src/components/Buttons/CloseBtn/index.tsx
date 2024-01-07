import clsx from "clsx";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

interface Props {
  onClose: () => void;
  classStr?: string;
  color?: string;
  strokeWidth?: number;
}

const CloseBtn: React.FC<Props> = ({
  onClose,
  classStr,
  color,
  strokeWidth,
}) => {
  return (
    <TouchableOpacity
      className={clsx(classStr ? classStr : "w-4 h-4")}
      onPress={onClose}
    >
      <Svg
        className="w-full h-full"
        viewBox="0 0 19 19"
        fill="none"
        stroke={color ? color : "#FFFFFF"}
        strokeWidth={strokeWidth || 1}
      >
        <Path d="M1 1L18 18" />
        <Path d="M18.5 1L1.5 18" />
      </Svg>
    </TouchableOpacity>
  );
};

export default CloseBtn;
