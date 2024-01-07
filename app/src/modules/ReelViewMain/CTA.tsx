import clsx from "clsx";
import { Image, TouchableOpacity } from "react-native";

interface Props {
  onPress: () => void;
  icon: string;
  width?: number;
  containerStyleTw?: string;
}

const CTA: React.FC<Props> = ({ onPress, icon, width, containerStyleTw }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={clsx(
        " rounded-full ",
        containerStyleTw
          ? containerStyleTw
          : "bg-[#5D588C]/80 border border-white/25"
      )}
      style={{
        width: width ? width : 60,
        padding: width ? width * 0.25 : 60 * 0.25,
      }}
    >
      <Image
        source={{ uri: icon }}
        className="w-full aspect-square"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default CTA;
