import clsx from "clsx";

import { Modal, View } from "react-native";
import LoadingV2 from ".";

interface Props {
  size?: number;
  color?: string;
  bgColor?: string;
  logoColor?: string;
  hideLogo?: boolean;
}

const LoadingModalV2: React.FC<Props> = ({
  size,
  color,
  logoColor,
  bgColor,
  hideLogo,
}) => {
  return (
    <Modal animationType="fade" transparent={true}>
      <View
        className={clsx(
          "w-full h-full flex justify-center items-center",
          bgColor || "bg-gray-500/50"
        )}
      >
        <LoadingV2
          color={color}
          hideLogo={hideLogo}
          size={size}
          logoColor={logoColor}
        />
      </View>
    </Modal>
  );
};

export default LoadingModalV2;
