import ImageWithURL from "@components/ImageWithURL";
import useCameraImage from "@modules/ImageCaptureScreen/store/useCameraImage";
import { View, TouchableOpacity, Text } from "react-native";
import { shallow } from "zustand/shallow";
interface Props {
  onSave: () => void;
}
const DoneComp: React.FC<Props> = ({ onSave }) => {
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
              uri: "https://ik.imagekit.io/socialboat/Frame%201000001369_IBijD-dHk.png?updatedAt=1700830940805",
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
            Done
          </Text>
        </View>
      </View>
    </>
  );
};

export default DoneComp;
