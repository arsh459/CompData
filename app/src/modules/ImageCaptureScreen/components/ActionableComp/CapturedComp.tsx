import ImageWithURL from "@components/ImageWithURL";
import useCameraImage from "@modules/ImageCaptureScreen/store/useCameraImage";
import { View, TouchableOpacity, Text } from "react-native";
import { shallow } from "zustand/shallow";
interface Props {
  onSave: () => void;
}
const CapturedComp: React.FC<Props> = ({ onSave }) => {
  const { _retakePicture } = useCameraImage(
    (state) => ({
      _retakePicture: state._retakePicture,
    }),
    shallow
  );

  return (
    <>
      <View className=" absolute left-10">
        <TouchableOpacity className="w-10" onPress={_retakePicture}>
          <ImageWithURL
            source={{
              uri: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio/Frame%201000001362_J3sbXtYroy.png?updatedAt=1700232703942",
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
            Cancel
          </Text>
        </View>
      </View>
      <View className="flex items-center justify-center">
        <TouchableOpacity onPress={onSave} className="w-16">
          <ImageWithURL
            source={{
              uri: "https://ik.imagekit.io/socialboat/Frame%201000001360_2OfsSVaMYy.png?updatedAt=1700147039593",
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
            Upload
          </Text>
        </View>
      </View>
    </>
  );
};

export default CapturedComp;
