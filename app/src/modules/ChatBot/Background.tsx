import ImageWithURL from "@components/ImageWithURL";
import { View } from "react-native";

interface Props {
  children?: React.ReactNode;
}

const Background: React.FC<Props> = ({ children }) => {
  return (
    <View className="flex-1 relative z-0">
      <ImageWithURL
        source={{
          uri: "https://ik.imagekit.io/socialboat/Frame_1443_RZ8OZZtb1.png?updatedAt=1681286378832",
        }}
        className="absolute -z-10 w-full h-full bg-[#B22ADD]"
        trWidth={500}
        resizeMode="cover"
      />
      {children}
    </View>
  );
};

export default Background;
