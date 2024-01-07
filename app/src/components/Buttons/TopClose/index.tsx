import { Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";

interface Props {
  onCloseModal: () => void;
  color?: string;
}

const TopClose: React.FC<Props> = ({ onCloseModal, color }) => {
  return (
    <Pressable onPress={onCloseModal}>
      <Svg
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
        stroke={color ? color : "white"}
      >
        <Path d="M1 1L18 18" />
        <Path d="M18.5 1L1.5 18" />
      </Svg>
    </Pressable>
  );
};

export default TopClose;
