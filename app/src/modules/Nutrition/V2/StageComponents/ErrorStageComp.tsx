import ImageWithURL from "@components/ImageWithURL";
import { View, Text } from "react-native";
interface Props {
  error: string;
}
const ErrorStageComp: React.FC<Props> = ({ error }) => {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="w-24 aspect-square">
        <ImageWithURL
          source={{
            uri: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Frame%201000001344_PnBR316uss.png?updatedAt=1698324619777",
          }}
          resizeMode="contain"
          className="w-full "
        />
      </View>
      <Text
        className="text-[#FF556C] text-xl mt-7 text-center"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        {error}
      </Text>
    </View>
  );
};
export default ErrorStageComp;
