import ImageWithURL from "@components/ImageWithURL";
import SvgIcons from "@components/SvgIcons";
import useCameraImage from "@modules/ImageCaptureScreen/store/useCameraImage";
import { useUserStore } from "@providers/user/store/useUserStore";
import { View, TouchableOpacity } from "react-native";
import { shallow } from "zustand/shallow";
import UploadViaPhone from "../cameraComps/UploadViaPhone";
interface Props {
  takePicture: () => void;
}
const CapturingComp: React.FC<Props> = ({ takePicture }) => {
  const { uid } = useUserStore(
    (state) => ({
      uid: state.user?.uid,
    }),
    shallow
  );
  const { toggleCameraType } = useCameraImage(
    (state) => ({
      toggleCameraType: state.toggleCameraType,
    }),
    shallow
  );

  return (
    <>
      <TouchableOpacity
        onPress={toggleCameraType}
        className="w-11 absolute left-0 "
      >
        <SvgIcons iconType="toggle" color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={takePicture} className="w-16">
        <ImageWithURL
          source={{
            uri: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio/Frame%201000001358_OcYBpGHCPE.png?updatedAt=1700138212476",
          }}
          resizeMode="contain"
          className="w-full aspect-square"
        />
      </TouchableOpacity>
      <TouchableOpacity className="w-7 absolute right-0">
        <UploadViaPhone
          uid={uid ? uid : ""}
          className=""
          setMedia={() => {}}
          setProgress={() => {}}
          mediaSelectType={"Images"}
        >
          <View className="w-max flex flex-row justify-center items-center">
            <ImageWithURL
              source={{
                uri: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio/Frame%201000001359_Arj5nm3zEc.png?updatedAt=1700138600021",
              }}
              className="w-full aspect-square"
              resizeMode="contain"
            />
          </View>
        </UploadViaPhone>
      </TouchableOpacity>
    </>
  );
};

export default CapturingComp;
