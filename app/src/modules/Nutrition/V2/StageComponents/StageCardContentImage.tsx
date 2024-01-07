import ImageWithURL from "@components/ImageWithURL";
import { View } from "react-native";
interface Props {
  imageUri: string;
}
const StageCardContentImage: React.FC<Props> = ({ imageUri }) => {
  return (
    <View className="max-w-[90px] w-[40%]  h-full mr-7 flex items-center justify-end">
      <View className="w-full flex items-center justify-end">
        <ImageWithURL
          source={{
            uri: imageUri,
          }}
          resizeMode={"contain"}
          className="aspect-[87/119]"
        />
      </View>
    </View>
  );
};

export default StageCardContentImage;
