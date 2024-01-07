// import { useCameraDevices_sb } from "@hooks/permissions/useCameraDevices";
// import { useIsForeground } from "@hooks/utils/useIsForeground";
// import { useIsFocused, useNavigation } from "@react-navigation/native";
// import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
// import { Camera, CameraType } from "expo-camera";
// import { useIsFocused } from "@react-navigation/native";
import clsx from "clsx";
// import { rtc_view } from "@antmedia/react-native-ant-media";
// import { createNewStream } from "./muxUtils";

interface Props {
  onPress: () => void;
  // cameraRef: RefObject<LiveStreamMethods>;
  isFullScreen?: boolean;
  localMedia: string;
  // onInitialized: () => void;
  orientation?: "landscape" | "portrait";
  //   pauseRecording: () => void;
  //   stopRecording: () => void;
}

const LiveStreamV3: React.FC<Props> = ({
  //   cameraActive,
  // cameraRef,
  onPress,
  isFullScreen,
  // onInitialized,
  localMedia,
  //   unmountCamera,
  orientation,
  //   postInteraction,
  //   pauseRecording,
  //   stopRecording,
}) => {
  // const isFocused = useIsFocused();
  // const [initDelat, setInitDelaty] = useState<boolean>(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setInitDelaty(true);
  //     onInitialized();
  //   }, 1000);
  // }, []);

  return (
    <Pressable onPress={onPress}>
      <View
        className={clsx(
          "rounded-2xl overflow-hidden border border-[#909090] relative",
          isFullScreen
            ? "bg-black w-full h-full flex-1"
            : orientation === "landscape"
            ? "w-[112px] h-[164px]"
            : "w-24 iphoneX:w-28 h-40 iphoneX:h-48"
        )}
      >
        {isFullScreen ? (
          <>
            <View className="absolute bottom-6 left-0 right-0 z-50">
              <Text
                style={{ fontFamily: "BaiJamjuree-Bold" }}
                className="text-white text-2xl text-center"
              >
                Stay in frame to get FPs
              </Text>
            </View>
            <View className="border-white z-50 rounded-2xl border-4 absolute top-2 left-2 right-2 bottom-2" />
          </>
        ) : null}

        {/* {isFocused && localMedia ? (
          <>{rtc_view(localMedia, styles.streamPlayer)}</>
        ) : null} */}
      </View>
    </Pressable>
  );
};

export default LiveStreamV3;

// const styles = StyleSheet.create({
//   streamPlayer: {
//     width: "100%",
//     height: "100%",
//     alignSelf: "center",
//   },
// });
