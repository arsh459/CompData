import { View, Image } from "react-native";

import { bottomRunnigStaticImage } from "@constants/imageKitURL";
interface Props {
  children?: React.ReactNode;
}
const TextAlert: React.FC<Props> = ({ children }) => {
  return (
    <View className="bg-[#100F1A] flex-1">
      {children}
      <View className="px-4 absolute bottom-0 pb-12">
        <Image
          source={{ uri: bottomRunnigStaticImage }}
          className="w-full aspect-[314/141] "
        />
      </View>
    </View>
  );
};

export default TextAlert;
