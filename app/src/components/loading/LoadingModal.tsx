import clsx from "clsx";

import { Modal, View } from "react-native";
import Loading from "./Loading";

interface Props {
  fill?: string;
  width?: string;
  height?: string;
  noBg?: boolean;
  bgStr?: string;
}

const LoadingModal: React.FC<Props> = ({
  fill,
  width,
  height,
  noBg,
  bgStr,
}) => {
  return (
    <Modal animationType="fade" transparent={true}>
      <View
        className={clsx(
          "w-full h-full flex justify-center items-center",
          !noBg ? bgStr || "bg-gray-500/50" : ""
        )}
      >
        <Loading fill={fill} width={width} height={height} />
      </View>
    </Modal>
  );
};

export default LoadingModal;
