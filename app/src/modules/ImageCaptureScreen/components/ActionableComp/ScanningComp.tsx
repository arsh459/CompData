import ImageWithURL from "@components/ImageWithURL";
import LoadingProgressBar from "@modules/AddNewItem/components/loadingScreen/LoadingProgressBar";
import { useLoadingAnimation } from "@modules/AddNewItemLoading/hooks/useLoadingAnimation";
import useCameraImage from "@modules/ImageCaptureScreen/store/useCameraImage";
import { View, TouchableOpacity, Text } from "react-native";
import { shallow } from "zustand/shallow";
interface Props {
  title: string;
}
const ScanningComp: React.FC<Props> = ({ title }) => {
  const { _retakePicture } = useCameraImage(
    (state) => ({
      _retakePicture: state._retakePicture,
    }),
    shallow
  );
  const { value, valueCircle, LOADING_TIME } = useLoadingAnimation();
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
        <LoadingProgressBar
          valueCircleAnimation={valueCircle}
          valuePercent={value}
          animationDuration={LOADING_TIME}
          title={"Scanning..."}
          circleSize={80}
          strokeWidth={6}
          inActiveColor={"#F4753F33"}
          textStyle="text-center text-white/70 text-xs"
          textStyleFont="Poppins-Regular"
          activeColor="#F4753F"
          showTitle={false}
          padding="p-2"
        />
        <View className="pt-2">
          <Text
            className="text-center text-white/70 text-xs"
            style={{ fontFamily: "Poppins-Regular" }}
          >
            {title}
          </Text>
        </View>
      </View>
    </>
  );
};

export default ScanningComp;
