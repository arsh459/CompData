import ImageWithURL from "@components/ImageWithURL";
import useCameraImage from "@modules/ImageCaptureScreen/store/useCameraImage";
import { TouchableOpacity, View, Text } from "react-native";
import { shallow } from "zustand/shallow";

interface Props {
  title: string;
}

const RetryComp: React.FC<Props> = ({ title }) => {
  const { _retakePicture } = useCameraImage(
    (state) => ({
      _retakePicture: state._retakePicture,
    }),
    shallow
  );
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          _retakePicture();
        }}
        className="w-16"
      >
        <ImageWithURL
          source={{
            uri: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio/Frame%201000001363_bbGgtApDr.png?updatedAt=1700233723694",
          }}
          resizeMode="contain"
          className="w-full aspect-square"
        />
      </TouchableOpacity>
      <View className="pt-2">
        <Text
          className="text-center text-white/70 text-xs"
          style={{ fontFamily: "Poppins-Regular" }}
        >
          {title}
        </Text>
      </View>
    </>
  );
};

export default RetryComp;
