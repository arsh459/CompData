import ImageWithURL from "@components/ImageWithURL";
import { View } from "react-native";
const StageCardBackground = () => {
  return (
    <View className="absolute top-0 left-0 right-0 bottom-0">
      <ImageWithURL
        source={{
          uri: "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain-ratio/Frame%201000001379_mq2A1PB9A.png?updatedAt=1701257141605",
        }}
        resizeMode={"contain"}
      />
    </View>
  );
};

export default StageCardBackground;
