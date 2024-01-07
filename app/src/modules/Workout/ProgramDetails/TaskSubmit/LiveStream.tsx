import CloseBtn from "@components/Buttons/CloseBtn";
// import Loading from "@components/loading/Loading";
import UseModal from "@components/UseModal";
import { useIsForeground } from "@hooks/utils/useIsForeground";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
// import { Camera, CameraDevice } from "react-native-vision-camera";

interface Props {
  showWarning: boolean;
  // cameraRef: RefObject<Camera>;
  postInteraction: boolean;
  pauseRecording: () => void;
  stopRecording: () => void;
}

const LiveStream: React.FC<Props> = ({
  showWarning,
  // cameraRef,
  postInteraction,
  pauseRecording,
  stopRecording,
}) => {
  const [hasPermission] = useState<boolean>(false);
  // const [cameraDevice, setCameraDevice] = useState<CameraDevice>();

  // const isFocused = useIsFocused();
  // const isForeground = useIsForeground();
  const navigation = useNavigation();
  const { appStateVisible } = useIsForeground();

  useEffect(() => {
    // const getPermition = async () => {
    //   const cameraPermissionStatus = await Camera.getCameraPermissionStatus();
    //   if (cameraPermissionStatus !== "authorized") {
    //     const newCameraPermission = await Camera.requestCameraPermission();
    //     setHasPermission(newCameraPermission === "authorized");
    //   } else {
    //     setHasPermission(cameraPermissionStatus === "authorized");
    //   }
    // };
    // getPermition();
  }, []);

  useEffect(() => {
    const getCameraDevices = async () => {
      // const devices = await Camera.getAvailableCameraDevices();
      // for (const device of devices) {
      //   if (device.position === "front") {
      //     setCameraDevice(device);
      //     return;
      //   }
      // }
    };

    getCameraDevices();
  }, []);

  const getPermission = async () => {
    // const newCameraPermission = await Camera.requestCameraPermission();
    // setHasPermission(newCameraPermission === "authorized");
  };

  useEffect(() => {
    // if app goes to background
    if (appStateVisible === "background") {
      stopRecording();
    } else if (appStateVisible === "inactive") {
      pauseRecording();
    }
  }, [appStateVisible, pauseRecording]);

  return (
    <>
      <View className="w-24 iphoneX:w-28 h-40 iphoneX:h-48 bg-black rounded-2xl overflow-hidden border border-[#909090]">
        {/* {cameraDevice ? (
          <Camera
            device={cameraDevice}
            ref={cameraRef}
            style={{ width: "100%", height: "100%" }}
            isActive={
              !showWarning &&
              !postInteraction &&
              isFocused &&
              appStateVisible === "active"
            }
            video={true}
            audio={false}
            preset="low"
            // preset="cif-352x288"
            onError={(e: any) => console.log("error in camera", e)}
          />
        ) : (
          <View className="flex-1 flex justify-center items-center">
            <Loading width="w-8" height="h-8" />
          </View>
        )} */}
      </View>
      <UseModal
        visible={!hasPermission}
        onClose={() => navigation.goBack()}
        width="w-full"
        height="h-full"
        bgColor="bg-[#100F1A]"
        classStr="flex items-end px-4"
        tone="dark"
      >
        <CloseBtn onClose={() => navigation.goBack()} />
        <View className="w-full flex-1 flex justify-center items-center">
          <Text className="text-white text-center text-xl iphoneX:text-2xl">
            Need camera permission. Press{" "}
            <Text className="text-sky-500" onPress={getPermission}>
              HERE
            </Text>{" "}
            to give acess to camera.
          </Text>
        </View>
      </UseModal>
    </>
  );
};

export default LiveStream;
